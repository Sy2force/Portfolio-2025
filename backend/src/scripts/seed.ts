import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Project from '../models/Project';
import Contact from '../models/Contact';

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Contact.deleteMany({});

    // Create admin user
    const adminUser = new User({
      email: 'admin@shayacoca.com',
      password: 'admin123456',
      role: 'admin'
    });
    await adminUser.save();
    console.log('✅ Admin user created');

    // Create demo projects
    const projects = [
      {
        title: {
          fr: 'Plateforme E-Commerce Moderne',
          en: 'Modern E-Commerce Platform',
          he: 'פלטפורמת מסחר אלקטרוני מודרנית'
        },
        description: {
          fr: 'Une plateforme e-commerce complète avec panier d\'achat, paiements Stripe, gestion des stocks et tableau de bord admin. Interface utilisateur moderne et responsive.',
          en: 'A complete e-commerce platform with shopping cart, Stripe payments, inventory management, and admin dashboard. Modern and responsive user interface.',
          he: 'פלטפורמת מסחר אלקטרוני מלאה עם עגלת קניות, תשלומי Stripe, ניהול מלאי ולוח בקרה למנהל. ממשק משתמש מודרני ורספונסיבי.'
        },
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express', 'JWT'],
        images: ['/images/projects/ecommerce-1.jpg', '/images/projects/ecommerce-2.jpg'],
        githubUrl: 'https://github.com/shayacoca/ecommerce-platform',
        liveUrl: 'https://ecommerce-demo.shayacoca.com',
        featured: true
      },
      {
        title: {
          fr: 'Application de Gestion de Tâches',
          en: 'Task Management Application',
          he: 'אפליקציית ניהול משימות'
        },
        description: {
          fr: 'Application de productivité avec gestion de projets, collaboration en temps réel, notifications push et synchronisation multi-appareils.',
          en: 'Productivity application with project management, real-time collaboration, push notifications, and multi-device synchronization.',
          he: 'אפליקציית פרודוקטיביות עם ניהול פרויקטים, שיתוף פעולה בזמן אמת, התראות push וסנכרון מרובה מכשירים.'
        },
        technologies: ['Next.js', 'TypeScript', 'Socket.io', 'PostgreSQL', 'Prisma', 'Redis'],
        images: ['/images/projects/taskmanager-1.jpg'],
        githubUrl: 'https://github.com/shayacoca/task-manager',
        liveUrl: 'https://tasks.shayacoca.com',
        featured: true
      },
      {
        title: {
          fr: 'Application Météo Mobile',
          en: 'Weather Mobile App',
          he: 'אפליקציית מזג אוויר לנייד'
        },
        description: {
          fr: 'Application mobile native avec prévisions météo détaillées, cartes interactives, alertes météo et géolocalisation automatique.',
          en: 'Native mobile application with detailed weather forecasts, interactive maps, weather alerts, and automatic geolocation.',
          he: 'אפליקציה לנייד מקורית עם תחזיות מזג אוויר מפורטות, מפות אינטראקטיביות, התראות מזג אוויר וגיאולוקיישן אוטומטי.'
        },
        technologies: ['React Native', 'Expo', 'OpenWeather API', 'Mapbox', 'AsyncStorage'],
        images: ['/images/projects/weather-1.jpg', '/images/projects/weather-2.jpg'],
        githubUrl: 'https://github.com/shayacoca/weather-app',
        featured: false
      }
    ];

    for (const projectData of projects) {
      const project = new Project(projectData);
      await project.save();
    }
    console.log('✅ Demo projects created');

    // Create demo contact messages
    const contacts = [
      {
        name: 'Jean Dupont',
        email: 'jean.dupont@example.com',
        subject: 'Demande de collaboration',
        message: 'Bonjour Shay, je suis intéressé par vos services de développement web. Pourriez-vous me contacter pour discuter d\'un projet ?',
        read: false
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        subject: 'Project Inquiry',
        message: 'Hi Shay, I saw your portfolio and I\'m impressed with your work. We have a React project that might be a good fit for your skills.',
        read: true
      }
    ];

    for (const contactData of contacts) {
      const contact = new Contact(contactData);
      await contact.save();
    }
    console.log('✅ Demo contact messages created');

    console.log('🎉 Database seeded successfully!');
    console.log('📧 Admin login: admin@shayacoca.com / admin123456');
    
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    mongoose.connection.close();
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();
