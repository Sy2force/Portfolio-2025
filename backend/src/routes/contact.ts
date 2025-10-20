import express, { Request, Response } from 'express';
import { sendContactMessage } from '../controllers/contact.controller';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Validation middleware
const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
];

// POST /api/contact - Submit contact form  
router.post('/', validateContact, async (req: Request, res: Response) => {
  // Check validation results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  
  // Call the controller
  return await sendContactMessage(req, res);
});

export default router;
