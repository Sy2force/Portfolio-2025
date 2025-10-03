// MongoDB initialization script
db = db.getSiblingDB('portfolio');

// Create collections
db.createCollection('users');
db.createCollection('projects');
db.createCollection('contacts');
db.createCollection('analytics');

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });

db.projects.createIndex({ slug: 1 }, { unique: true });
db.projects.createIndex({ category: 1, year: -1 });
db.projects.createIndex({ featured: 1, isPublished: 1 });
db.projects.createIndex({ title: 'text', description: 'text', longDescription: 'text' });

db.contacts.createIndex({ email: 1 });
db.contacts.createIndex({ status: 1, priority: -1 });
db.contacts.createIndex({ createdAt: -1 });

db.analytics.createIndex({ event: 1, category: 1 });
db.analytics.createIndex({ sessionId: 1 });
db.analytics.createIndex({ createdAt: -1 });

// Insert default admin user
db.users.insertOne({
  email: 'admin@portfolio.com',
  password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY3OeIw6L6pDgE.', // password: Admin123!
  name: 'Admin User',
  role: 'admin',
  twoFactorEnabled: false,
  refreshTokens: [],
  loginAttempts: 0,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert sample projects
db.projects.insertMany([
  {
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    description: 'Modern e-commerce platform with AI recommendations',
    longDescription: 'A full-featured e-commerce platform built with Next.js and Node.js, featuring AI-powered product recommendations, real-time inventory management, and seamless payment integration.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    images: [],
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'Docker'],
    category: 'Full Stack',
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
    year: 2024,
    status: 'completed',
    views: 1234,
    likes: 89,
    order: 1,
    isPublished: true,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'AI Analytics Dashboard',
    slug: 'ai-analytics-dashboard',
    description: 'Real-time analytics dashboard with predictive insights',
    longDescription: 'Advanced analytics dashboard leveraging machine learning for predictive insights, featuring real-time data visualization and automated reporting.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    images: [],
    technologies: ['React', 'Python', 'TensorFlow', 'D3.js', 'PostgreSQL'],
    category: 'Data & AI',
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
    year: 2024,
    status: 'completed',
    views: 987,
    likes: 76,
    order: 2,
    isPublished: true,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'Mobile Banking App',
    slug: 'mobile-banking-app',
    description: 'Secure mobile banking application with biometric auth',
    longDescription: 'Comprehensive mobile banking solution with biometric authentication, real-time transactions, and advanced security features.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    images: [],
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'JWT', 'Redis'],
    category: 'FinTech',
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
    year: 2023,
    status: 'completed',
    views: 654,
    likes: 43,
    order: 3,
    isPublished: true,
    publishedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('MongoDB initialized successfully!');
