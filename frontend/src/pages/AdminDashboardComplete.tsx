import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  HiHome, HiUser, HiLightningBolt, HiFolder, HiCog, 
  HiDocumentText, HiMail, HiLogout, HiMenu, HiX 
} from 'react-icons/hi';
import { toast } from 'react-hot-toast';

// Import des composants de formulaire
import HomeEditor from '../components/admin/editors/HomeEditor';
import AboutEditor from '../components/admin/editors/AboutEditor';
import SkillsEditor from '../components/admin/editors/SkillsEditor';
import ProjectsEditor from '../components/admin/editors/ProjectsEditor';
import ServicesEditor from '../components/admin/editors/ServicesEditor';
import CVEditor from '../components/admin/editors/CVEditor';
import ContactEditor from '../components/admin/editors/ContactEditor';

type TabType = 'home' | 'about' | 'skills' | 'projects' | 'services' | 'cv' | 'contact';

interface Tab {
  id: TabType;
  label: string;
  icon: any;
  color: string;
}

const tabs: Tab[] = [
  { id: 'home', label: 'Accueil', icon: HiHome, color: 'from-neon-blue to-neon-cyan' },
  { id: 'about', label: 'À propos', icon: HiUser, color: 'from-neon-purple to-neon-magenta' },
  { id: 'skills', label: 'Compétences', icon: HiLightningBolt, color: 'from-neon-green to-neon-blue' },
  { id: 'projects', label: 'Projets', icon: HiFolder, color: 'from-neon-pink to-neon-purple' },
  { id: 'services', label: 'Services', icon: HiCog, color: 'from-neon-orange to-neon-yellow' },
  { id: 'cv', label: 'CV', icon: HiDocumentText, color: 'from-neon-cyan to-neon-green' },
  { id: 'contact', label: 'Contact', icon: HiMail, color: 'from-neon-magenta to-neon-pink' },
];

const AdminDashboardComplete = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem('adminEmail') || 'Admin';

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    toast.success('Déconnexion réussie', { icon: '👋' });
    navigate('/admin/login');
  };

  const renderEditor = () => {
    switch (activeTab) {
      case 'home':
        return <HomeEditor />;
      case 'about':
        return <AboutEditor />;
      case 'skills':
        return <SkillsEditor />;
      case 'projects':
        return <ProjectsEditor />;
      case 'services':
        return <ServicesEditor />;
      case 'cv':
        return <CVEditor />;
      case 'contact':
        return <ContactEditor />;
      default:
        return <HomeEditor />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-72 bg-dark-secondary/50 backdrop-blur-xl border-r border-white/10 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-display font-bold text-gradient mb-2">
                  Dashboard Admin
                </h1>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span>👤</span>
                  <span>{adminEmail}</span>
                </p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r ' + tab.color + ' text-white shadow-lg'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="ml-auto w-2 h-2 rounded-full bg-white"
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-red-400 hover:text-red-300 transition-all duration-300"
                >
                  <HiLogout className="w-5 h-5" />
                  <span className="font-medium">Déconnexion</span>
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Top Bar */}
          <div className="sticky top-0 z-10 bg-dark-secondary/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors duration-300"
                >
                  {sidebarOpen ? (
                    <HiX className="w-6 h-6 text-gray-400" />
                  ) : (
                    <HiMenu className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                <div>
                  <h2 className="text-xl font-display font-bold text-white">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </h2>
                  <p className="text-sm text-gray-400">
                    Gérez le contenu de cette section
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderEditor()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardComplete;
