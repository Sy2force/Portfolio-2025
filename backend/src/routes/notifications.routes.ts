import express, { Request, Response } from 'express';
import Notification from '../models/Notification.model';
import { auth, requireAdmin } from '../middleware/auth';

interface AuthRequest extends Request {
  user?: any;
}

const router = express.Router();

// Get admin notifications (protected)
router.get('/admin', auth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    // Generate smart notifications
    await Notification.createSmartNotifications(req.user.id);

    // Get all notifications
    const notifications = await Notification.find({
      userId: req.user.id,
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: { $gte: new Date() } }
      ]
    })
    .sort('-priority -createdAt')
    .limit(20);

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Mark notification as read (protected)
router.patch('/:id/read', auth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Mark all as read (protected)
router.patch('/read-all', auth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await Notification.updateMany(
      { userId: req.user.id, read: false },
      { read: true }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete notification (protected)
router.delete('/:id', auth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get notification count (protected)
router.get('/count', auth, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.user.id,
      read: false,
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: { $gte: new Date() } }
      ]
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
