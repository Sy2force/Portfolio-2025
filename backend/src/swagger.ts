import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API Documentation',
      version: '1.0.0',
      description: 'API REST complète pour le portfolio full-stack avec authentification JWT, gestion de projets, contacts et dashboard admin.',
      contact: {
        name: 'Shay Acoca',
        email: 'shay.acoca@example.com',
        url: 'https://github.com/Sy2force/Portfolio-2025',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://portfolio-backend.onrender.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token obtenu via /api/auth/login',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Message d\'erreur',
            },
            message: {
              type: 'string',
              description: 'Description détaillée',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['user', 'admin'] },
            avatar: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Project: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            longDescription: { type: 'string' },
            category: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
            image: { type: 'string' },
            images: { type: 'array', items: { type: 'string' } },
            demoUrl: { type: 'string' },
            githubUrl: { type: 'string' },
            featured: { type: 'boolean' },
            published: { type: 'boolean' },
            views: { type: 'number' },
            likes: { type: 'number' },
            technologies: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Contact: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            subject: { type: 'string' },
            message: { type: 'string' },
            phone: { type: 'string' },
            company: { type: 'string' },
            status: { type: 'string', enum: ['new', 'read', 'replied', 'archived'] },
            isSpam: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentification et gestion utilisateur' },
      { name: 'Projects', description: 'Gestion des projets portfolio' },
      { name: 'Contact', description: 'Formulaire de contact et messages' },
      { name: 'Admin', description: 'Dashboard administrateur (protégé)' },
      { name: 'Analytics', description: 'Statistiques et analytics' },
      { name: 'Upload', description: 'Upload de fichiers et images' },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Portfolio API Docs',
  }));

  // JSON endpoint
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
