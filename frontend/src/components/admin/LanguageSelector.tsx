import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';
import { useAdmin } from '../../contexts/AdminContext';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { user, updatePreferences } = useAdmin();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'fr' | 'en' | 'he'>(user?.preferences?.language || 'fr');

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'he', label: 'עברית', flag: '🇮🇱' },
  ];

  const handleLanguageChange = async (langCode: string) => {
    setCurrentLang(langCode as 'fr' | 'en' | 'he');
    setIsOpen(false);
    
    // Change i18n language
    await i18n.changeLanguage(langCode);
    
    // Update user preferences
    await updatePreferences({ language: langCode as 'fr' | 'en' | 'he' });
    
    // Update HTML lang attribute
    document.documentElement.lang = langCode;
  };

  const currentLanguage = languages.find(lang => lang.code === currentLang);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all flex items-center space-x-2"
      >
        <FaGlobe className="text-lg" />
        <span className="text-sm">{currentLanguage?.flag}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-full right-0 mb-2 z-50 bg-dark-secondary/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl overflow-hidden"
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ x: 5 }}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 w-full transition-all
                    ${currentLang === lang.code 
                      ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="text-sm font-medium whitespace-nowrap">{lang.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
