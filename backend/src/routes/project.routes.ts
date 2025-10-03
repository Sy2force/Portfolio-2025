import { Router } from 'express';
import { body, query, validationResult } from 'express-validator';
import Project from '../models/Project.model';
import { authenticate, authorize, optionalAuth } from '../middleware/auth';
import { cache, clearCache } from '../middleware/cache';
import { upload } from '../middleware/upload';
import { logger } from '../server';

const router = Router();

// Validation middleware
const handleValidationErrors = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Get all projects (public)
router.get('/',
  optionalAuth,
  cache(300), // Cache for 5 minutes
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 50 }),
    query('category').optional().isString(),
    query('search').optional().isString(),
    query('featured').optional().isBoolean(),
    query('status').optional().isIn(['completed', 'in-progress', 'planned']),
  ],
  handleValidationErrors,
  async (req: any, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 12;
      const skip = (page - 1) * limit;

      const filter: any = { isPublished: true };
      
      if (req.query.category) {
        filter.category = req.query.category;
      }
      
      if (req.query.featured === 'true') {
        filter.featured = true;
      }
      
      if (req.query.status) {
        filter.status = req.query.status;
      }
      
      if (req.query.search) {
        filter.$text = { $search: req.query.search };
      }

      const [projects, total] = await Promise.all([
        Project.find(filter)
          .sort({ featured: -1, order: -1, year: -1, createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Project.countDocuments(filter),
      ]);

      res.json({
        success: true,
        projects,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      logger.error('Get projects error:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  }
);

// Get single project
router.get('/:slug',
  optionalAuth,
  cache(600), // Cache for 10 minutes
  async (req: any, res) => {
    try {
      const project = await Project.findOne({ 
        slug: req.params.slug,
        isPublished: true,
      });

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      // Increment views
      if (!req.user || req.user.role !== 'admin') {
        await project.incrementViews();
      }

      res.json({
        success: true,
        project,
      });
    } catch (error) {
      logger.error('Get project error:', error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  }
);

// Get featured projects
router.get('/featured/list',
  cache(600),
  async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 3;
      const projects = await Project.getFeatured(limit);

      res.json({
        success: true,
        projects,
      });
    } catch (error) {
      logger.error('Get featured projects error:', error);
      res.status(500).json({ error: 'Failed to fetch featured projects' });
    }
  }
);

// Like/Unlike project
router.post('/:id/like',
  optionalAuth,
  async (req: any, res) => {
    try {
      const project = await Project.findById(req.params.id);
      
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const { like = true } = req.body;
      await project.toggleLike(like);

      res.json({
        success: true,
        likes: project.likes,
      });
    } catch (error) {
      logger.error('Like project error:', error);
      res.status(500).json({ error: 'Failed to update like' });
    }
  }
);

// Create project (admin only)
router.post('/',
  authenticate,
  authorize('admin'),
  upload.single('image'),
  [
    body('title').trim().isLength({ min: 1 }),
    body('description').trim().isLength({ min: 1, max: 200 }),
    body('longDescription').trim().isLength({ min: 1, max: 2000 }),
    body('technologies').isArray({ min: 1 }),
    body('category').isIn(['Full Stack', 'Frontend', 'Backend', 'Mobile', 'Data & AI', 'FinTech', 'E-commerce', 'Media', 'Productivity', 'Other']),
    body('year').optional().isInt({ min: 2000, max: new Date().getFullYear() + 1 }),
  ],
  handleValidationErrors,
  async (req: any, res) => {
    try {
      const projectData = {
        ...req.body,
        technologies: JSON.parse(req.body.technologies || '[]'),
      };

      if (req.file) {
        // Handle image upload
        projectData.image = `/uploads/${req.file.filename}`;
      }

      const project = new Project(projectData);
      await project.save();

      clearCache('/api/projects');
      clearCache('/api/projects/featured');

      res.status(201).json({
        success: true,
        project,
      });
    } catch (error) {
      logger.error('Create project error:', error);
      res.status(500).json({ error: 'Failed to create project' });
    }
  }
);

// Update project (admin only)
router.put('/:id',
  authenticate,
  authorize('admin'),
  upload.single('image'),
  [
    body('title').optional().trim().isLength({ min: 1 }),
    body('description').optional().trim().isLength({ min: 1, max: 200 }),
    body('longDescription').optional().trim().isLength({ min: 1, max: 2000 }),
    body('technologies').optional().isArray({ min: 1 }),
    body('category').optional().isIn(['Full Stack', 'Frontend', 'Backend', 'Mobile', 'Data & AI', 'FinTech', 'E-commerce', 'Media', 'Productivity', 'Other']),
  ],
  handleValidationErrors,
  async (req: any, res) => {
    try {
      const updates = { ...req.body };
      
      if (req.body.technologies) {
        updates.technologies = JSON.parse(req.body.technologies);
      }
      
      if (req.file) {
        updates.image = `/uploads/${req.file.filename}`;
      }

      const project = await Project.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true, runValidators: true }
      );

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      clearCache('/api/projects');
      clearCache(`/api/projects/${project.slug}`);
      clearCache('/api/projects/featured');

      res.json({
        success: true,
        project,
      });
    } catch (error) {
      logger.error('Update project error:', error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  }
);

// Delete project (admin only)
router.delete('/:id',
  authenticate,
  authorize('admin'),
  async (req, res) => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      clearCache('/api/projects');
      clearCache(`/api/projects/${project.slug}`);
      clearCache('/api/projects/featured');

      res.json({
        success: true,
        message: 'Project deleted successfully',
      });
    } catch (error) {
      logger.error('Delete project error:', error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
  }
);

// Bulk update project order (admin only)
router.put('/reorder/bulk',
  authenticate,
  authorize('admin'),
  async (req, res) => {
    try {
      const { projects } = req.body;
      
      if (!Array.isArray(projects)) {
        return res.status(400).json({ error: 'Invalid projects array' });
      }

      const bulkOps = projects.map((p: any) => ({
        updateOne: {
          filter: { _id: p.id },
          update: { $set: { order: p.order } },
        },
      }));

      await Project.bulkWrite(bulkOps);

      clearCache('/api/projects');
      clearCache('/api/projects/featured');

      res.json({
        success: true,
        message: 'Projects reordered successfully',
      });
    } catch (error) {
      logger.error('Reorder projects error:', error);
      res.status(500).json({ error: 'Failed to reorder projects' });
    }
  }
);

export default router;
