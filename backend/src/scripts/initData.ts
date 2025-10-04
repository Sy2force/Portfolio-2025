import mongoose from 'mongoose';
import dotenv from 'dotenv';
import HomeContent from '../models/HomeContent.model';
import AboutContent from '../models/AboutContent.model';
import ContactContent from '../models/ContactContent.model';

dotenv.config();

const initializeData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✓ MongoDB connecté');

    // Initialiser Home Content
    const homeExists = await HomeContent.findOne();
    if (!homeExists) {
      await HomeContent.create({
        title: 'Portfolio Full-Stack 2025',
        subtitle: 'Développeur Full-Stack & Digital Marketer',
        description: 'Créateur d\'expériences numériques innovantes',
        heroImage: '/images/hero-bg.jpg',
        ctaText: 'Voir mes projets',
        ctaLink: '/projects',
        stats: {
          yearsExperience: 5,
          completedProjects: 50,
          happyClients: 30,
          linesOfCode: 500000,
        },
      });
      console.log('✓ Home content initialisé');
    }

    // Initialiser About Content
    const aboutExists = await AboutContent.findOne();
    if (!aboutExists) {
      await AboutContent.create({
        name: 'Shay Acoca',
        bio: 'Développeur Full-Stack passionné par la création d\'expériences web modernes et performantes.',
        longBio: 'Expert en React, Node.js et MongoDB avec plus de 5 ans d\'expérience dans le développement web. Spécialisé dans la création d\'applications full-stack scalables et l\'optimisation des performances.',
        profileImage: '/images/profile.jpg',
        email: 'shay.acoca@example.com',
        phone: '+33 6 12 34 56 78',
        location: 'Paris, France',
        socialLinks: {
          github: 'https://github.com/Sy2force',
          linkedin: 'https://linkedin.com/in/shayacoca',
          twitter: 'https://twitter.com/shayacoca',
        },
        languages: ['Français', 'Anglais', 'Hébreu'],
        interests: ['Développement Web', 'UI/UX Design', 'Intelligence Artificielle'],
      });
      console.log('✓ About content initialisé');
    }

    // Initialiser Contact Content
    const contactExists = await ContactContent.findOne();
    if (!contactExists) {
      await ContactContent.create({
        title: 'Contactez-moi',
        description: 'N\'hésitez pas à me contacter pour discuter de vos projets',
        email: 'shay.acoca@example.com',
        phone: '+33 6 12 34 56 78',
        address: 'Paris, France',
        availability: 'Disponible pour de nouveaux projets',
        responseTime: 'Réponse sous 24-48h',
        socialLinks: {
          github: 'https://github.com/Sy2force',
          linkedin: 'https://linkedin.com/in/shayacoca',
          twitter: 'https://twitter.com/shayacoca',
        },
        successMessage: 'Merci ! Votre message a été envoyé avec succès.',
        errorMessage: 'Une erreur est survenue. Veuillez réessayer.',
      });
      console.log('✓ Contact content initialisé');
    }

    console.log('\n✅ Toutes les données ont été initialisées avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
};

initializeData();
