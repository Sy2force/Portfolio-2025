import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Le nom doit contenir au moins 2 caractères',
      'string.max': 'Le nom ne peut pas dépasser 100 caractères',
      'any.required': 'Le nom est obligatoire'
    }),
  
  email: Joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
    .messages({
      'string.email': 'Veuillez entrer un email valide',
      'any.required': 'L\'email est obligatoire'
    }),
  
  subject: Joi.string()
    .trim()
    .min(5)
    .max(200)
    .required()
    .messages({
      'string.min': 'Le sujet doit contenir au moins 5 caractères',
      'string.max': 'Le sujet ne peut pas dépasser 200 caractères',
      'any.required': 'Le sujet est obligatoire'
    }),
  
  message: Joi.string()
    .trim()
    .min(10)
    .max(2000)
    .required()
    .messages({
      'string.min': 'Le message doit contenir au moins 10 caractères',
      'string.max': 'Le message ne peut pas dépasser 2000 caractères',
      'any.required': 'Le message est obligatoire'
    })
});

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
  
  technologies: Joi.array().items(Joi.string()).min(1).required(),
  category: Joi.string().valid('web', 'mobile', 'desktop', 'design').required(),
  status: Joi.string().valid('planning', 'development', 'completed', 'maintenance').required(),
  featured: Joi.boolean().default(false),
  priority: Joi.number().min(1).max(10).default(5)
});
