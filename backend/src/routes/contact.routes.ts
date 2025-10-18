import express from 'express';
import {
  sendContactMessage,
  getAllContacts,
  markContactAsRead,
  deleteContact
} from '../controllers/contact.controller';
import { authMiddleware, authorize } from '../middleware/auth';
import { validateRequest, contactSchema } from '../middleware/validation';

const router = express.Router();

// Public routes
router.post('/', validateRequest(contactSchema), sendContactMessage);

// Protected routes (Admin only)
router.get('/', authMiddleware, authorize('admin'), getAllContacts);
router.put('/:id/read', authMiddleware, authorize('admin'), markContactAsRead);
router.delete('/:id', authMiddleware, authorize('admin'), deleteContact);

export default router;
