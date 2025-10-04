import { Router } from 'express';
import { auth, requireAdmin } from '../middleware/auth';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import * as contentController from '../controllers/content.controller';
import { upload } from '../middleware/upload';

const router = Router();

// ============= HOME CONTENT =============
router.get('/home', contentController.getHomeContent);
router.put('/home', 
  auth, 
  requireAdmin,
  [
    body('title').optional().trim().isLength({ min: 3, max: 100 }),
    body('subtitle').optional().trim().isLength({ min: 3, max: 200 }),
    body('description').optional().trim().isLength({ min: 10, max: 500 }),
  ],
  validateRequest,
  contentController.updateHomeContent
);

// ============= ABOUT CONTENT =============
router.get('/about', contentController.getAboutContent);
router.put('/about',
  auth,
  requireAdmin,
  [
    body('name').optional().trim().isLength({ min: 2, max: 50 }),
    body('bio').optional().trim().isLength({ min: 10, max: 500 }),
    body('email').optional().isEmail(),
  ],
  validateRequest,
  contentController.updateAboutContent
);

// ============= SKILLS =============
router.get('/skills', contentController.getAllSkills);
router.post('/skills',
  auth,
  requireAdmin,
  [
    body('name').trim().notEmpty().isLength({ min: 2, max: 50 }),
    body('level').isInt({ min: 0, max: 100 }),
    body('category').isIn(['frontend', 'backend', 'tools', 'marketing', 'other']),
  ],
  validateRequest,
  contentController.createSkill
);
router.put('/skills/:id',
  auth,
  requireAdmin,
  contentController.updateSkill
);
router.delete('/skills/:id',
  auth,
  requireAdmin,
  contentController.deleteSkill
);

// ============= SERVICES =============
router.get('/services', contentController.getAllServices);
router.post('/services',
  auth,
  requireAdmin,
  [
    body('title').trim().notEmpty().isLength({ min: 3, max: 100 }),
    body('description').trim().notEmpty().isLength({ min: 10, max: 500 }),
  ],
  validateRequest,
  contentController.createService
);
router.put('/services/:id',
  auth,
  requireAdmin,
  contentController.updateService
);
router.delete('/services/:id',
  auth,
  requireAdmin,
  contentController.deleteService
);

// ============= CV CONTENT =============
router.get('/cv', contentController.getCVContent);
router.post('/cv/upload',
  auth,
  requireAdmin,
  upload.single('cv'),
  contentController.uploadCV
);
router.put('/cv',
  auth,
  requireAdmin,
  contentController.updateCVContent
);

// ============= CONTACT CONTENT =============
router.get('/contact', contentController.getContactContent);
router.put('/contact',
  auth,
  requireAdmin,
  [
    body('email').optional().isEmail(),
    body('title').optional().trim().isLength({ min: 3, max: 100 }),
  ],
  validateRequest,
  contentController.updateContactContent
);

export default router;
