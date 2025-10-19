'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import frTranslation from './translations/fr.json';
import enTranslation from './translations/en.json';
import heTranslation from './translations/he.json';

const resources = {
  fr: { translation: frTranslation },
  en: { translation: enTranslation },
  he: { translation: heTranslation }
};

// Initialize i18n only on client side
if (typeof window !== 'undefined') {
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
} else {
  // Server-side initialization
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'fr',
      debug: false,
      lng: 'fr',
      
      interpolation: {
        escapeValue: false,
      }
    });
}

export default i18n;
