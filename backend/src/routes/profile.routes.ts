import express, { Request, Response } from 'express';
import Profile from '../models/Profile.model';
import User from '../models/User.model';
import { auth, requireAdmin } from '../middleware/auth';
import { upload } from '../middleware/upload';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

interface AuthRequest extends Request {
  user?: any;
}

const router = express.Router();

// Get public profile
router.get('/public', async (req, res) => {
  try {
    const profile = await Profile.findOne({}).select('-userId');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get admin profile (protected)
router.get('/', auth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) {
      // Create default profile if not exists
      const newProfile = await Profile.create({
        userId: req.user.id,
        name: req.user.name,
        email: req.user.email,
        title: 'Full Stack Developer',
        bio: 'Passionate developer creating amazing digital experiences',
      });
      return res.json(newProfile);
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update profile (protected)
router.put('/', auth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const allowedUpdates = [
      'name', 'title', 'bio', 'longBio', 'email', 'phone',
      'location', 'headline', 'availability', 'socialLinks',
      'languages', 'yearsOfExperience', 'completedProjects',
      'happyClients', 'hoursWorked'
    ];

    const updates = {};
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { ...updates, lastUpdated: new Date() },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      profile
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Upload avatar (protected)
router.post('/avatar', auth, requireAdmin, upload.single('avatar'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filename = `avatar-${req.user.id}-${Date.now()}.webp`;
    const uploadPath = path.join(__dirname, '../../../uploads/avatars');
    
    // Create directory if not exists
    await fs.mkdir(uploadPath, { recursive: true });
    
    // Process and save image
    await sharp(req.file.buffer)
      .resize(400, 400, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(path.join(uploadPath, filename));

    // Update profile with new avatar
    const avatarUrl = `/uploads/avatars/${filename}`;
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { avatar: avatarUrl, lastUpdated: new Date() },
      { new: true }
    );

    // Also update user avatar
    await User.findByIdAndUpdate(req.user.id, { avatar: avatarUrl });

    res.json({
      message: 'Avatar uploaded successfully',
      avatar: avatarUrl,
      profile
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error });
  }
});

// Upload cover image (protected)
router.post('/cover', auth, requireAdmin, upload.single('cover'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filename = `cover-${req.user.id}-${Date.now()}.webp`;
    const uploadPath = path.join(__dirname, '../../../uploads/covers');
    
    await fs.mkdir(uploadPath, { recursive: true });
    
    await sharp(req.file.buffer)
      .resize(1920, 600, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(path.join(uploadPath, filename));

    const coverUrl = `/uploads/covers/${filename}`;
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { coverImage: coverUrl, lastUpdated: new Date() },
      { new: true }
    );

    res.json({
      message: 'Cover image uploaded successfully',
      cover: coverUrl,
      profile
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error });
  }
});

// Update skills (protected)
router.put('/skills', auth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { skills } = req.body;
    
    if (!Array.isArray(skills)) {
      return res.status(400).json({ message: 'Skills must be an array' });
    }

    // Update user skills
    await User.findByIdAndUpdate(req.user.id, { skills });

    res.json({
      message: 'Skills updated successfully',
      skills
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
