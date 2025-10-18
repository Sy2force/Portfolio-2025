import express from 'express';
import { login, verifyToken } from '../controllers/auth.controller';
import { validateAuth } from '../middleware/validation';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/login', validateAuth, login);

// Protected routes
router.get('/verify', authMiddleware, verifyToken);

export default router;
