import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errorMessage
      });
      return;
    }
    
    next();
  };
};

// Contact validation schema
export const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 100 characters',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required'
  }),
  subject: Joi.string().max(200).optional(),
  message: Joi.string().min(10).max(5000).required().messages({
    'string.min': 'Message must be at least 10 characters',
    'string.max': 'Message cannot exceed 5000 characters',
    'any.required': 'Message is required'
  }),
  phone: Joi.string().pattern(/^[+]?[1-9][\d]{0,15}$/).optional().messages({
    'string.pattern.base': 'Invalid phone number format'
  }),
  company: Joi.string().max(100).optional(),
  projectType: Joi.string().valid('web', 'mobile', 'desktop', 'consulting', 'other').optional(),
  budget: Joi.string().valid('under-5k', '5k-15k', '15k-50k', '50k-plus', 'not-specified').optional(),
  timeline: Joi.string().valid('asap', '1-month', '3-months', '6-months', 'flexible').optional()
});

// Project validation schema
export const projectSchema = Joi.object({
  title: Joi.object({
    fr: Joi.string().required(),
    en: Joi.string().required(),
    he: Joi.string().required()
  }).required(),
  description: Joi.object({
    fr: Joi.string().required(),
    en: Joi.string().required(),
    he: Joi.string().required()
  }).required(),
  shortDescription: Joi.object({
    fr: Joi.string().max(200).required(),
    en: Joi.string().max(200).required(),
    he: Joi.string().max(200).required()
  }).required(),
  slug: Joi.string().lowercase().required(),
  images: Joi.array().items(Joi.string().uri()).optional(),
  technologies: Joi.array().items(Joi.string()).min(1).required(),
  category: Joi.string().valid('web', 'mobile', 'desktop', 'ai', 'blockchain', 'other').required(),
  status: Joi.string().valid('completed', 'in-progress', 'planned', 'archived').optional(),
  githubUrl: Joi.string().uri().optional(),
  liveUrl: Joi.string().uri().optional(),
  featured: Joi.boolean().optional(),
  priority: Joi.number().min(0).max(10).optional(),
  stats: Joi.object({
    stars: Joi.number().min(0).optional(),
    forks: Joi.number().min(0).optional(),
    views: Joi.number().min(0).optional(),
    commits: Joi.number().min(0).optional()
  }).optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  teamSize: Joi.number().min(1).optional(),
  myRole: Joi.string().optional(),
  challenges: Joi.array().items(Joi.string()).optional(),
  learnings: Joi.array().items(Joi.string()).optional()
});

// User validation schemas
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'user').optional()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  isActive: Joi.boolean().optional()
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required()
});

// Auth validation middleware
export const validateAuth = validateRequest(loginSchema);
