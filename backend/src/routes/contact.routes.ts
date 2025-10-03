import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.model';
import { authenticate, authorize } from '../middleware/auth';
import { rateLimiter } from '../middleware/rateLimiter';
import { sendEmail } from '../utils/email';
import { logger } from '../server';
import { detectSpam } from '../utils/spamDetector';

const router = Router();

// Validation middleware
const handleValidationErrors = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Submit contact form (public)
router.post('/submit',
  rateLimiter(3, 60), // 3 requests per minute
  [
    body('name').trim().isLength({ min: 2, max: 100 }),
    body('email').isEmail().normalizeEmail(),
    body('subject').trim().isLength({ min: 2, max: 200 }),
    body('message').trim().isLength({ min: 10, max: 5000 }),
    body('phone').optional().isMobilePhone('any'),
    body('company').optional().trim(),
    body('budget').optional().isIn(['< 5k€', '5k-10k€', '10k-25k€', '25k-50k€', '> 50k€']),
    body('projectType').optional().isIn(['Website', 'Mobile App', 'Web App', 'E-commerce', 'Consulting', 'Other']),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const contactData = {
        ...req.body,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        source: req.get('referer') || 'direct',
      };

      // Check for spam
      const spamScore = detectSpam(contactData);
      if (spamScore > 0.7) {
        contactData.isSpam = true;
        contactData.priority = 'low';
      } else {
        // Set priority based on budget
        if (contactData.budget && contactData.budget !== 'Not specified') {
          const budgetPriority = {
            '< 5k€': 'low',
            '5k-10k€': 'medium',
            '10k-25k€': 'high',
            '25k-50k€': 'high',
            '> 50k€': 'high',
          };
          contactData.priority = budgetPriority[contactData.budget] || 'medium';
        }
      }

      const contact = new Contact(contactData);
      await contact.save();

      // Send notification email to admin (if not spam)
      if (!contact.isSpam) {
        await sendEmail({
          to: process.env.ADMIN_EMAIL || 'admin@example.com',
          subject: `New Contact: ${contact.subject}`,
          template: 'newContact',
          data: {
            name: contact.name,
            email: contact.email,
            subject: contact.subject,
            message: contact.message,
            priority: contact.priority,
          },
        });
      }

      // Send confirmation email to sender
      await sendEmail({
        to: contact.email,
        subject: 'Message reçu - Nous vous répondrons bientôt',
        template: 'contactConfirmation',
        data: {
          name: contact.name,
        },
      });

      res.status(201).json({
        success: true,
        message: 'Message envoyé avec succès',
        contactId: contact._id,
      });
    } catch (error) {
      logger.error('Submit contact error:', error);
      res.status(500).json({ error: 'Failed to submit message' });
    }
  }
);

// Get all contacts (admin only)
router.get('/',
  authenticate,
  authorize('admin'),
  async (req, res) => {
    try {
      const {
        page = 1,
        limit = 20,
        status,
        priority,
        isSpam = false,
        search,
      } = req.query;

      const filter: any = { isSpam: isSpam === 'true' };
      
      if (status) filter.status = status;
      if (priority) filter.priority = priority;
      
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { subject: { $regex: search, $options: 'i' } },
        ];
      }

      const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

      const [contacts, total] = await Promise.all([
        Contact.find(filter)
          .sort({ status: 1, priority: -1, createdAt: -1 })
          .skip(skip)
          .limit(parseInt(limit as string))
          .lean(),
        Contact.countDocuments(filter),
      ]);

      res.json({
        success: true,
        contacts,
        pagination: {
          page: parseInt(page as string),
          limit: parseInt(limit as string),
          total,
          pages: Math.ceil(total / parseInt(limit as string)),
        },
      });
    } catch (error) {
      logger.error('Get contacts error:', error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  }
);

// Get contact statistics (admin only)
router.get('/stats',
  authenticate,
  authorize('admin'),
  async (req, res) => {
    try {
      const [
        total,
        unread,
        replied,
        byStatus,
        byPriority,
        byProjectType,
        recentMessages,
      ] = await Promise.all([
        Contact.countDocuments({ isSpam: false }),
        Contact.countDocuments({ status: 'new', isSpam: false }),
        Contact.countDocuments({ status: 'replied', isSpam: false }),
        Contact.aggregate([
          { $match: { isSpam: false } },
          { $group: { _id: '$status', count: { $sum: 1 } } },
        ]),
        Contact.aggregate([
          { $match: { isSpam: false } },
          { $group: { _id: '$priority', count: { $sum: 1 } } },
        ]),
        Contact.aggregate([
          { $match: { isSpam: false } },
          { $group: { _id: '$projectType', count: { $sum: 1 } } },
        ]),
        Contact.find({ isSpam: false })
          .sort({ createdAt: -1 })
          .limit(5)
          .select('name subject createdAt status priority'),
      ]);

      res.json({
        success: true,
        stats: {
          total,
          unread,
          replied,
          byStatus: byStatus.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {}),
          byPriority: byPriority.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {}),
          byProjectType: byProjectType.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {}),
          recentMessages,
        },
      });
    } catch (error) {
      logger.error('Get contact stats error:', error);
      res.status(500).json({ error: 'Failed to fetch statistics' });
    }
  }
);

// Get single contact (admin only)
router.get('/:id',
  authenticate,
  authorize('admin'),
  async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      // Mark as read
      await contact.markAsRead();

      res.json({
        success: true,
        contact,
      });
    } catch (error) {
      logger.error('Get contact error:', error);
      res.status(500).json({ error: 'Failed to fetch contact' });
    }
  }
);

// Update contact status (admin only)
router.patch('/:id/status',
  authenticate,
  authorize('admin'),
  [
    body('status').isIn(['new', 'read', 'replied', 'archived']),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      contact.status = req.body.status;
      
      if (req.body.status === 'replied') {
        contact.repliedAt = new Date();
      }
      
      await contact.save();

      res.json({
        success: true,
        contact,
      });
    } catch (error) {
      logger.error('Update contact status error:', error);
      res.status(500).json({ error: 'Failed to update status' });
    }
  }
);

// Reply to contact (admin only)
router.post('/:id/reply',
  authenticate,
  authorize('admin'),
  [
    body('subject').trim().isLength({ min: 1 }),
    body('message').trim().isLength({ min: 1 }),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      // Send email
      await sendEmail({
        to: contact.email,
        subject: req.body.subject,
        template: 'reply',
        data: {
          name: contact.name,
          message: req.body.message,
        },
      });

      // Update contact status
      await contact.markAsReplied();

      res.json({
        success: true,
        message: 'Reply sent successfully',
      });
    } catch (error) {
      logger.error('Reply to contact error:', error);
      res.status(500).json({ error: 'Failed to send reply' });
    }
  }
);

// Toggle spam status (admin only)
router.patch('/:id/spam',
  authenticate,
  authorize('admin'),
  async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      await contact.toggleSpam();

      res.json({
        success: true,
        isSpam: contact.isSpam,
      });
    } catch (error) {
      logger.error('Toggle spam error:', error);
      res.status(500).json({ error: 'Failed to toggle spam status' });
    }
  }
);

// Add notes to contact (admin only)
router.patch('/:id/notes',
  authenticate,
  authorize('admin'),
  [
    body('notes').trim(),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { notes: req.body.notes },
        { new: true, runValidators: true }
      );
      
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      res.json({
        success: true,
        contact,
      });
    } catch (error) {
      logger.error('Update contact notes error:', error);
      res.status(500).json({ error: 'Failed to update notes' });
    }
  }
);

// Delete contact (admin only)
router.delete('/:id',
  authenticate,
  authorize('admin'),
  async (req, res) => {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      res.json({
        success: true,
        message: 'Contact deleted successfully',
      });
    } catch (error) {
      logger.error('Delete contact error:', error);
      res.status(500).json({ error: 'Failed to delete contact' });
    }
  }
);

export default router;
