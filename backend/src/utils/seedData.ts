import User from '../models/User';
import Project from '../models/Project';
import Contact from '../models/Contact';

export const seedUsers = async () => {
  try {
    // Check if admin user exists
    const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@shayacoca.com' });
    
    if (!existingAdmin) {
      const adminUser = await User.create({
        name: 'Shay Acoca',
        email: process.env.ADMIN_EMAIL || 'admin@shayacoca.com',
        password: process.env.ADMIN_PASSWORD || 'admin123456',
        role: 'admin'
      });
      console.log('✅ Admin user created:', adminUser.email);
    } else {
      console.log('✅ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  }
};

export const seedProjects = async () => {
  try {
    const existingProjects = await Project.countDocuments();
    
    if (existingProjects === 0) {
      const projects = [
        {
          title: {
            fr: 'E-Commerce Platform',
            en: 'E-Commerce Platform',
            he: 'פלטפורמת מסחר אלקטרוני'
          },
          description: {
            fr: 'Une plateforme e-commerce complète avec gestion des produits, panier, paiements et administration.',
            en: 'A complete e-commerce platform with product management, cart, payments and administration.',
            he: 'פלטפורמת מסחר אלקטרוני מלאה עם ניהול מוצרים, עגלת קניות, תשלומים וניהול.'
          },
          shortDescription: {
            fr: 'Plateforme e-commerce moderne avec React et Node.js',
            en: 'Modern e-commerce platform with React and Node.js',
            he: 'פלטפורמת מסחר אלקטרוני מודרנית עם React ו-Node.js'
          },
          slug: 'ecommerce-platform',
          images: [
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
            'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800'
          ],
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux', 'Express'],
          category: 'web',
          status: 'completed',
          githubUrl: 'https://github.com/shayacoca/ecommerce-platform',
          liveUrl: 'https://ecommerce-demo.shayacoca.com',
          featured: true,
          priority: 9,
          stats: {
            stars: 45,
            forks: 12,
            views: 1250,
            commits: 180
          },
          startDate: new Date('2024-01-15'),
          endDate: new Date('2024-04-20'),
          teamSize: 1,
          myRole: 'Full-Stack Developer',
          challenges: [
            'Implementing secure payment processing',
            'Optimizing database queries for large product catalogs',
            'Creating responsive design for mobile commerce'
          ],
          learnings: [
            'Advanced React patterns and state management',
            'Payment gateway integration with Stripe',
            'Database optimization techniques'
          ]
        },
        {
          title: {
            fr: 'Gestionnaire de Tâches',
            en: 'Task Manager App',
            he: 'אפליקציית ניהול משימות'
          },
          description: {
            fr: 'Application de gestion de tâches avec collaboration en temps réel, notifications et tableaux Kanban.',
            en: 'Task management application with real-time collaboration, notifications and Kanban boards.',
            he: 'אפליקציית ניהול משימות עם שיתוף פעולה בזמן אמת, התראות ולוחות קנבן.'
          },
          shortDescription: {
            fr: 'App collaborative de gestion de projets',
            en: 'Collaborative project management app',
            he: 'אפליקציית ניהול פרויקטים שיתופית'
          },
          slug: 'task-manager-app',
          images: [
            'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
            'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800'
          ],
          technologies: ['Next.js', 'TypeScript', 'Socket.io', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
          category: 'web',
          status: 'completed',
          githubUrl: 'https://github.com/shayacoca/task-manager',
          liveUrl: 'https://tasks.shayacoca.com',
          featured: true,
          priority: 8,
          stats: {
            stars: 32,
            forks: 8,
            views: 890,
            commits: 145
          },
          startDate: new Date('2024-05-01'),
          endDate: new Date('2024-07-15'),
          teamSize: 2,
          myRole: 'Lead Developer',
          challenges: [
            'Real-time synchronization across multiple clients',
            'Complex drag-and-drop functionality',
            'Efficient notification system'
          ],
          learnings: [
            'WebSocket implementation with Socket.io',
            'Advanced TypeScript patterns',
            'Database design for collaborative apps'
          ]
        },
        {
          title: {
            fr: 'Application Météo',
            en: 'Weather App',
            he: 'אפליקציית מזג אוויר'
          },
          description: {
            fr: 'Application météo avec prévisions détaillées, cartes interactives et alertes météorologiques.',
            en: 'Weather application with detailed forecasts, interactive maps and weather alerts.',
            he: 'אפליקציית מזג אוויר עם תחזיות מפורטות, מפות אינטראקטיביות והתראות מזג אוויר.'
          },
          shortDescription: {
            fr: 'App météo avec géolocalisation et cartes',
            en: 'Weather app with geolocation and maps',
            he: 'אפליקציית מזג אוויר עם מיקום גיאוגרפי ומפות'
          },
          slug: 'weather-app',
          images: [
            'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
            'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800'
          ],
          technologies: ['React Native', 'Expo', 'OpenWeather API', 'Mapbox', 'Redux Toolkit'],
          category: 'mobile',
          status: 'completed',
          githubUrl: 'https://github.com/shayacoca/weather-app',
          liveUrl: 'https://expo.dev/@shayacoca/weather-app',
          featured: true,
          priority: 7,
          stats: {
            stars: 28,
            forks: 6,
            views: 650,
            commits: 95
          },
          startDate: new Date('2024-08-01'),
          endDate: new Date('2024-09-30'),
          teamSize: 1,
          myRole: 'Mobile Developer',
          challenges: [
            'Optimizing API calls for battery life',
            'Implementing smooth animations',
            'Cross-platform compatibility'
          ],
          learnings: [
            'React Native development patterns',
            'Mobile app performance optimization',
            'Working with geolocation APIs'
          ]
        }
      ];

      await Project.insertMany(projects);
      console.log('✅ Sample projects created');
    } else {
      console.log('✅ Projects already exist');
    }
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
  }
};

export const seedDatabase = async () => {
  console.log('🌱 Starting database seeding...');
  await seedUsers();
  await seedProjects();
  console.log('🌱 Database seeding completed!');
};
