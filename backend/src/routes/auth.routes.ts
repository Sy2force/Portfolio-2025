import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import User from '../models/User.model';
import { authenticate, refreshToken } from '../middleware/auth';
import { rateLimiter } from '../middleware/rateLimiter';
import { logger } from '../server';
import { sendEmail } from '../utils/email';

const router = Router();

// Validation middleware
const handleValidationErrors = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Register
router.post('/register',
  rateLimiter(5, 60),
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    body('name').trim().isLength({ min: 2 }),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password, name } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'Email already registered' });
      }

      const user = new User({ email, password, name });
      await user.save();

      const accessToken = user.generateAccessToken();
      const refreshTokenValue = await user.generateRefreshToken();

      // Send welcome email
      await sendEmail({
        to: email,
        subject: 'Welcome to Portfolio',
        template: 'welcome',
        data: { name },
      });

      res.status(201).json({
        success: true,
        accessToken,
        refreshToken: refreshTokenValue,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } catch (error) {
      logger.error('Registration error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }
);

// Login
router.post('/login',
  rateLimiter(10, 60),
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password, totp } = req.body;

      const user = await User.findOne({ email }).select('+password +twoFactorSecret');
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check if account is locked
      if (user.isLocked()) {
        return res.status(423).json({ 
          error: 'Account locked due to too many failed attempts',
          lockedUntil: user.lockUntil,
        });
      }

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        await user.incLoginAttempts();
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check 2FA if enabled
      if (user.twoFactorEnabled) {
        if (!totp) {
          return res.status(200).json({ 
            requiresTwoFactor: true,
            message: 'Please provide 2FA code',
          });
        }

        const verified = speakeasy.totp.verify({
          secret: user.twoFactorSecret!,
          encoding: 'base32',
          token: totp,
          window: 2,
        });

        if (!verified) {
          return res.status(401).json({ error: 'Invalid 2FA code' });
        }
      }

      await user.resetLoginAttempts();

      const accessToken = user.generateAccessToken();
      const refreshTokenValue = await user.generateRefreshToken();

      res.json({
        success: true,
        accessToken,
        refreshToken: refreshTokenValue,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
          twoFactorEnabled: user.twoFactorEnabled,
        },
      });
    } catch (error) {
      logger.error('Login error:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  }
);

// Refresh token
router.post('/refresh', refreshToken);

// Logout
router.post('/logout', authenticate, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.id).select('+refreshTokens');
    if (user) {
      user.refreshTokens = [];
      await user.save();
    }
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

// Get current user
router.get('/me', authenticate, (req: any, res) => {
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      role: req.user.role,
      avatar: req.user.avatar,
      twoFactorEnabled: req.user.twoFactorEnabled,
    },
  });
});

// Update profile
router.put('/profile',
  authenticate,
  [
    body('name').optional().trim().isLength({ min: 2 }),
    body('email').optional().isEmail().normalizeEmail(),
  ],
  handleValidationErrors,
  async (req: any, res) => {
    try {
      const updates = req.body;
      delete updates.password;
      delete updates.role;

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updates },
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        user: {
          id: user!._id,
          email: user!.email,
          name: user!.name,
          role: user!.role,
          avatar: user!.avatar,
        },
      });
    } catch (error) {
      logger.error('Profile update error:', error);
      res.status(500).json({ error: 'Profile update failed' });
    }
  }
);

// Change password
router.put('/password',
  authenticate,
  [
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  ],
  handleValidationErrors,
  async (req: any, res) => {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(req.user.id).select('+password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isValid = await user.comparePassword(currentPassword);
      if (!isValid) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      user.password = newPassword;
      await user.save();

      res.json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
      logger.error('Password change error:', error);
      res.status(500).json({ error: 'Password change failed' });
    }
  }
);

// Setup 2FA
router.post('/2fa/setup', authenticate, async (req: any, res) => {
  try {
    const secret = speakeasy.generateSecret({
      name: `Portfolio (${req.user.email})`,
      length: 32,
    });

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.twoFactorSecret = secret.base32;
    await user.save();

    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url!);

    res.json({
      success: true,
      secret: secret.base32,
      qrCode: qrCodeUrl,
    });
  } catch (error) {
    logger.error('2FA setup error:', error);
    res.status(500).json({ error: '2FA setup failed' });
  }
});

// Verify and enable 2FA
router.post('/2fa/verify', authenticate, async (req: any, res) => {
  try {
    const { token } = req.body;

    const user = await User.findById(req.user.id).select('+twoFactorSecret');
    if (!user || !user.twoFactorSecret) {
      return res.status(400).json({ error: '2FA not setup' });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 2,
    });

    if (!verified) {
      return res.status(400).json({ error: 'Invalid verification code' });
    }

    user.twoFactorEnabled = true;
    await user.save();

    res.json({ success: true, message: '2FA enabled successfully' });
  } catch (error) {
    logger.error('2FA verification error:', error);
    res.status(500).json({ error: '2FA verification failed' });
  }
});

// Disable 2FA
router.post('/2fa/disable', authenticate, async (req: any, res) => {
  try {
    const { password } = req.body;

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    user.twoFactorEnabled = false;
    user.twoFactorSecret = undefined;
    await user.save();

    res.json({ success: true, message: '2FA disabled successfully' });
  } catch (error) {
    logger.error('2FA disable error:', error);
    res.status(500).json({ error: '2FA disable failed' });
  }
});

export default router;
