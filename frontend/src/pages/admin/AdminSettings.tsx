import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCog, FaPalette, FaLanguage, FaBell, FaShieldAlt, FaDatabase, FaTrash, FaDownload, FaUpload } from 'react-icons/fa';
import { useAdmin } from '../../contexts/AdminContext';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const { user, updatePreferences } = useAdmin();
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'Général', icon: FaCog },
    { id: 'appearance', label: 'Apparence', icon: FaPalette },
    { id: 'language', label: 'Langue', icon: FaLanguage },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'security', label: 'Sécurité', icon: FaShieldAlt },
    { id: 'backup', label: 'Sauvegarde', icon: FaDatabase },
  ];

  const themes = [
    { id: 'dark', name: 'Sombre', colors: ['#0a0a0f', '#1a1a2e'] },
    { id: 'light', name: 'Clair', colors: ['#ffffff', '#f0f0f0'] },
    { id: 'neon', name: 'Néon', colors: ['#0a0a0f', '#ff00ff', '#00ffff'] },
    { id: 'cyberpunk', name: 'Cyberpunk', colors: ['#0f0f23', '#ff003c', '#00ffc8'] },
  ];

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'he', name: 'עברית', flag: '🇮🇱', rtl: true },
  ];

  const handleLanguageChange = async (langCode: string) => {
    await i18n.changeLanguage(langCode);
    await updatePreferences({ language: langCode as 'fr' | 'en' | 'he' });
    document.documentElement.lang = langCode;
    document.documentElement.dir = languages.find(l => l.code === langCode)?.rtl ? 'rtl' : 'ltr';
    toast.success('Langue mise à jour');
  };

  const handleBackup = async () => {
    try {
      const response = await fetch('/api/admin/backup', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-${new Date().toISOString()}.json`;
      a.click();
      toast.success('Sauvegarde créée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleClearCache = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir vider le cache ?')) return;
    
    try {
      await fetch('/api/admin/cache/clear', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      toast.success('Cache vidé avec succès');
    } catch (error) {
      toast.error('Erreur lors du vidage du cache');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Paramètres</h1>
        <p className="text-gray-400">Configurez votre portfolio et vos préférences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="glass-card p-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all mb-2
                  ${activeTab === tab.id 
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                <tab.icon />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10"
          >
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Paramètres généraux</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nom du site
                  </label>
                  <input
                    type="text"
                    defaultValue="Portfolio Futuriste"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    URL du site
                  </label>
                  <input
                    type="url"
                    defaultValue="https://portfolio.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email de contact
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
                  />
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Apparence</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Thème
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {themes.map((theme) => (
                      <motion.button
                        key={theme.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 rounded-lg border-2 border-white/10 hover:border-neon-blue transition-all"
                      >
                        <div className="flex space-x-2 mb-2">
                          {theme.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-white">{theme.name}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Couleur principale
                  </label>
                  <input
                    type="color"
                    defaultValue="#00d9ff"
                    className="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Animations</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
              </div>
            )}

            {/* Language Settings */}
            {activeTab === 'language' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Langue & Région</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Langue du site
                  </label>
                  <div className="space-y-3">
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`
                          w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all
                          ${user?.preferences?.language === lang.code 
                            ? 'border-neon-blue bg-neon-blue/10' 
                            : 'border-white/10 hover:border-white/20'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{lang.flag}</span>
                          <span className="text-white font-medium">{lang.name}</span>
                        </div>
                        {user?.preferences?.language === lang.code && (
                          <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Fuseau horaire
                  </label>
                  <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all">
                    <option>Europe/Paris (UTC+1)</option>
                    <option>America/New_York (UTC-5)</option>
                    <option>Asia/Jerusalem (UTC+2)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Notifications</h2>
                
                <div className="space-y-4">
                  {[
                    { id: 'projects', label: 'Rappels pour ajouter des projets' },
                    { id: 'profile', label: 'Suggestions de mise à jour du profil' },
                    { id: 'messages', label: 'Nouveaux messages de contact' },
                    { id: 'analytics', label: 'Rapports d\'analytics hebdomadaires' },
                    { id: 'security', label: 'Alertes de sécurité' },
                  ].map((notif) => (
                    <div key={notif.id} className="flex items-center justify-between">
                      <span className="text-gray-300">{notif.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-blue"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Sécurité</h2>
                
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    Authentification à deux facteurs : <strong>Activée</strong>
                  </p>
                </div>

                <div>
                  <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all">
                    Changer le mot de passe
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Sessions actives</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white">Chrome - MacBook Pro</p>
                        <p className="text-gray-400 text-sm">Paris, France • Actuel</p>
                      </div>
                      <span className="text-green-400 text-sm">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Backup Settings */}
            {activeTab === 'backup' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Sauvegarde & Restauration</h2>
                
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBackup}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-green-500/30 transition-all"
                  >
                    <FaDownload />
                    <span>Créer une sauvegarde</span>
                  </motion.button>

                  <label className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium cursor-pointer transition-all">
                    <input type="file" accept=".json" className="hidden" />
                    <FaUpload />
                    <span>Restaurer depuis une sauvegarde</span>
                  </label>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClearCache}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 font-medium transition-all"
                  >
                    <FaTrash />
                    <span>Vider le cache</span>
                  </motion.button>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-400 text-sm">
                    💡 Dernière sauvegarde automatique : Aujourd'hui à 14h30
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
