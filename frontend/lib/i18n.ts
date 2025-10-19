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

// Initialize i18n immediately
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: false,
    lng: 'fr',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;
