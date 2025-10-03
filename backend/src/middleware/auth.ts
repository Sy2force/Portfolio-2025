import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User.model';
import { logger } from '../server';

interface AuthRequest extends Request {
  user?: IUser;
  token?: string;
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractToken(req);
    
    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    
    const user = await User.findById(decoded.id).select('-password -refreshTokens');
    
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    if (user.isLocked()) {
      res.status(403).json({ error: 'Account is locked' });
      return;
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
    } else {
      logger.error('Authentication error:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }

    next();
  };
};

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = extractToken(req);
    
    if (!token) {
      next();
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    const user = await User.findById(decoded.id).select('-password -refreshTokens');
    
    if (user && !user.isLocked()) {
      req.user = user;
      req.token = token;
    }
    
    next();
  } catch (error) {
    next();
  }
};

function extractToken(req: Request): string | null {
  if (req.headers.authorization?.startsWith('Bearer ')) {
    return req.headers.authorization.substring(7);
  }
  
  if (req.cookies?.token) {
    return req.cookies.token;
  }
  
  return null;
}

// Named exports for compatibility
export { authenticateToken as auth, authenticateToken as authenticate };
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user || (req.user.role !== 'admin' && !req.user.isAdmin)) {
    res.status(403).json({ 
      message: 'Access denied. Admin privileges required.' 
    });
    return;
  }
  next();
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      res.status(401).json({ error: 'Refresh token required' });
      return;
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret'
    ) as any;
    
    const user = await User.findById(decoded.id).select('+refreshTokens');
    
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      res.status(401).json({ error: 'Invalid refresh token' });
      return;
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = await user.generateRefreshToken();
    
    // Remove old refresh token
    user.refreshTokens = user.refreshTokens.filter(t => t !== refreshToken);
    await user.save();
    
    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error('Refresh token error:', error);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};
