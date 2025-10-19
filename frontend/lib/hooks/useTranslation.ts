import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export type Language = 'fr' | 'en' | 'he';

export function useTranslation() {
  const { t, i18n } = useI18nTranslation();
  const router = useRouter();

  const currentLanguage = i18n.language as Language;

  const changeLanguage = useCallback(async (lang: Language) => {
    await i18n.changeLanguage(lang);
    
    // Update the URL to reflect the language change
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/').filter(Boolean);
    
    // Check if the first segment is a language code
    const languageRoutes = ['a-propos', 'about'];
    const isLanguageRoute = segments[0] && languageRoutes.includes(segments[0]);
    
    if (isLanguageRoute) {
      // Replace language-specific route
      if (lang === 'fr' && segments[0] === 'about') {
        segments[0] = 'a-propos';
      } else if (lang === 'en' && segments[0] === 'a-propos') {
        segments[0] = 'about';
      }
    }
    
    const newPath = '/' + segments.join('/');
    router.push(newPath);
  }, [i18n, router]);

  const isRTL = currentLanguage === 'he';

  return {
    t,
    currentLanguage,
    changeLanguage,
    isRTL,
    languages: [
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'he', name: 'עברית', flag: '🇮🇱' }
    ] as const
  };
}
