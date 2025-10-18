import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      // Navigation
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.projects": "Projets",
      "nav.services": "Services",
      "nav.contact": "Contact",
      "nav.cv": "CV",
      
      // Hero Section
      "hero.title": "Shay Acoca",
      "hero.subtitle": "Expert Création de Contenu • Développeur Full-Stack",
      "hero.description": "3 ans d'expérience en marketing digital • 1+ an en développement full-stack",
      "hero.education": "En perfectionnement chez HackerU jusqu'en 2026",
      "hero.github": "Voir mon GitHub",
      "hero.cv": "Télécharger CV",
      "hero.stats.marketing": "Marketing Digital",
      "hero.stats.fullstack": "Full-Stack",
      "hero.stats.formation": "Formation HackerU",
      
      // Projects
      "projects.title": "Projets Réalisés",
      "projects.subtitle": "Découvrez mes réalisations clients avec des statistiques réelles",
      "projects.filter.all": "Tous",
      "projects.filter.saas": "SaaS",
      "projects.filter.ecommerce": "E-Commerce",
      "projects.filter.web": "Web",
      "projects.filter.pwa": "PWA",
      "projects.filter.analytics": "Analytics",
      "projects.filter.portfolio": "Portfolio",
      
      // Contact
      "contact.title": "Contactez-moi",
      "contact.subtitle": "Une question, un projet ou simplement envie d'échanger ?",
      "contact.form.name": "Nom complet",
      "contact.form.email": "Email",
      "contact.form.subject": "Sujet",
      "contact.form.message": "Message",
      "contact.form.send": "Envoyer le message",
      "contact.form.sending": "Envoi en cours...",
      "contact.info.email": "Email",
      "contact.info.phone": "Téléphone",
      "contact.info.location": "Localisation",
      "contact.location": "Jérusalem, Tel Aviv - Israël"
    }
  },
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.about": "About",
      "nav.projects": "Projects",
      "nav.services": "Services",
      "nav.contact": "Contact",
      "nav.cv": "CV",
      
      // Hero Section
      "hero.title": "Shay Acoca",
      "hero.subtitle": "Content Creation Expert • Full-Stack Developer",
      "hero.description": "3 years experience in digital marketing • 1+ year in full-stack development",
      "hero.education": "Currently studying at HackerU until 2026",
      "hero.github": "View my GitHub",
      "hero.cv": "Download CV",
      "hero.stats.marketing": "Digital Marketing",
      "hero.stats.fullstack": "Full-Stack",
      "hero.stats.formation": "HackerU Training",
      
      // Projects
      "projects.title": "Completed Projects",
      "projects.subtitle": "Discover my client achievements with real statistics",
      "projects.filter.all": "All",
      "projects.filter.saas": "SaaS",
      "projects.filter.ecommerce": "E-Commerce",
      "projects.filter.web": "Web",
      "projects.filter.pwa": "PWA",
      "projects.filter.analytics": "Analytics",
      "projects.filter.portfolio": "Portfolio",
      
      // Contact
      "contact.title": "Contact Me",
      "contact.subtitle": "A question, a project or just want to chat?",
      "contact.form.name": "Full Name",
      "contact.form.email": "Email",
      "contact.form.subject": "Subject",
      "contact.form.message": "Message",
      "contact.form.send": "Send Message",
      "contact.form.sending": "Sending...",
      "contact.info.email": "Email",
      "contact.info.phone": "Phone",
      "contact.info.location": "Location",
      "contact.location": "Jerusalem, Tel Aviv - Israel"
    }
  },
  he: {
    translation: {
      // Navigation
      "nav.home": "בית",
      "nav.about": "אודות",
      "nav.projects": "פרויקטים",
      "nav.services": "שירותים",
      "nav.contact": "צור קשר",
      "nav.cv": "קורות חיים",
      
      // Hero Section
      "hero.title": "שי אקוקה",
      "hero.subtitle": "מומחה יצירת תוכן • מפתח Full-Stack",
      "hero.description": "3 שנות ניסיון בשיווק דיגיטלי • שנה+ בפיתוח full-stack",
      "hero.education": "כרגע לומד ב-HackerU עד 2026",
      "hero.github": "צפה ב-GitHub שלי",
      "hero.cv": "הורד קורות חיים",
      "hero.stats.marketing": "שיווק דיגיטלי",
      "hero.stats.fullstack": "Full-Stack",
      "hero.stats.formation": "הכשרת HackerU",
      
      // Projects
      "projects.title": "פרויקטים שהושלמו",
      "projects.subtitle": "גלה את ההישגים שלי עם לקוחות עם סטטיסטיקות אמיתיות",
      "projects.filter.all": "הכל",
      "projects.filter.saas": "SaaS",
      "projects.filter.ecommerce": "מסחר אלקטרוני",
      "projects.filter.web": "אתרים",
      "projects.filter.pwa": "PWA",
      "projects.filter.analytics": "אנליטיקס",
      "projects.filter.portfolio": "פורטפוליו",
      
      // Contact
      "contact.title": "צור קשר",
      "contact.subtitle": "שאלה, פרויקט או סתם רוצה לשוחח?",
      "contact.form.name": "שם מלא",
      "contact.form.email": "אימייל",
      "contact.form.subject": "נושא",
      "contact.form.message": "הודעה",
      "contact.form.send": "שלח הודעה",
      "contact.form.sending": "שולח...",
      "contact.info.email": "אימייל",
      "contact.info.phone": "טלפון",
      "contact.info.location": "מיקום",
      "contact.location": "ירושלים, תל אביב - ישראל"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;
