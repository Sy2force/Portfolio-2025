import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaDesktop } from 'react-icons/fa';
import { useAdmin } from '../../contexts/AdminContext';

const ThemeSwitcher = () => {
  const { user, updatePreferences } = useAdmin();
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>(user?.preferences?.theme || 'dark');
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: 'dark', icon: FaMoon, label: 'Sombre' },
    { value: 'light', icon: FaSun, label: 'Clair' },
    { value: 'auto', icon: FaDesktop, label: 'Auto' },
  ];

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (selectedTheme: string) => {
    if (selectedTheme === 'dark' || (selectedTheme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleThemeChange = async (newTheme: string) => {
    setTheme(newTheme as 'dark' | 'light' | 'auto');
    setIsOpen(false);
    await updatePreferences({ theme: newTheme as 'dark' | 'light' | 'auto' });
  };

  const CurrentIcon = themes.find(t => t.value === theme)?.icon || FaMoon;

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
      >
        <CurrentIcon className="text-lg" />
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
              className="absolute bottom-full left-0 mb-2 z-50 bg-dark-secondary/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl overflow-hidden"
            >
              {themes.map((t) => (
                <motion.button
                  key={t.value}
                  whileHover={{ x: 5 }}
                  onClick={() => handleThemeChange(t.value)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 w-full transition-all
                    ${theme === t.value 
                      ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <t.icon className="text-lg" />
                  <span className="text-sm font-medium whitespace-nowrap">{t.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
