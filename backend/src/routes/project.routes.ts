import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/project.controller';
import { authMiddleware, authorize } from '../middleware/auth';
import { validateRequest, projectSchema } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes (Admin only)
router.post('/', authMiddleware, authorize('admin'), validateRequest(projectSchema), createProject);
router.put('/:id', authMiddleware, authorize('admin'), validateRequest(projectSchema), updateProject);
router.delete('/:id', authMiddleware, authorize('admin'), deleteProject);

export default router;
