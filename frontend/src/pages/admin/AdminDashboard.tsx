import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  FaProjectDiagram, FaUser, FaCog, FaBell,
  FaSignOutAlt, FaPlus, FaChartLine,
  FaBars, FaTimes
} from 'react-icons/fa';
import { useAdmin } from '../../contexts/AdminContext';
import NotificationBox from '../../components/admin/NotificationBox';
import ThemeSwitcher from '../../components/admin/ThemeSwitcher';
import LanguageSelector from '../../components/admin/LanguageSelector';

const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    visits: 0,
    skills: 0
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    fetchStats();
    fetchNotifications();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications/admin', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        setNotificationCount(data.filter((n: any) => !n.read).length);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: FaChartLine, label: 'Dashboard', color: 'from-blue-500 to-cyan-500' },
    { path: '/admin/projects', icon: FaProjectDiagram, label: 'Projets', color: 'from-purple-500 to-pink-500' },
    { path: '/admin/profile', icon: FaUser, label: 'Profil', color: 'from-green-500 to-emerald-500' },
    { path: '/admin/settings', icon: FaCog, label: 'Paramètres', color: 'from-orange-500 to-red-500' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-neon-purple/20 rounded-full mix-blend-screen filter blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neon-blue/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-pink/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed lg:relative w-72 h-full bg-black/40 backdrop-blur-xl border-r border-white/10"
        >
          {/* User Profile */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-4">
              <img
                src={user?.avatar || '/default-avatar.png'}
                alt={user?.name}
                className="w-12 h-12 rounded-full ring-2 ring-neon-blue/50"
              />
              <div>
                <h3 className="text-white font-semibold">{user?.name}</h3>
                <p className="text-gray-400 text-sm">Administrateur</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block mb-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-xl transition-all
                      ${isActive 
                        ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <item.icon className="text-xl" />
                    <span className="font-medium">{item.label}</span>
                    {item.path === '/admin/dashboard' && notificationCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {notificationCount}
                      </span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t border-white/10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/admin/projects/new')}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl text-white font-medium hover:shadow-lg hover:shadow-neon-blue/30 transition-all"
            >
              <FaPlus />
              <span>Nouveau Projet</span>
            </motion.button>
          </div>

          {/* Settings & Logout */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-4">
              <ThemeSwitcher />
              <LanguageSelector />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-400 hover:text-red-300 transition-all"
            >
              <FaSignOutAlt />
              <span>Déconnexion</span>
            </motion.button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="bg-black/20 backdrop-blur-xl border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-white hover:text-neon-blue transition-colors"
              >
                {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>

              <h1 className="text-2xl font-bold text-white">
                {location.pathname === '/admin/dashboard' && 'Dashboard'}
                {location.pathname === '/admin/projects' && 'Gestion des Projets'}
                {location.pathname === '/admin/profile' && 'Mon Profil'}
                {location.pathname === '/admin/settings' && 'Paramètres'}
              </h1>

              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative text-white hover:text-neon-blue transition-colors"
                  onClick={() => {/* Toggle notifications panel */}}
                >
                  <FaBell size={20} />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </motion.button>

                {/* Profile Menu */}
                <Link to="/admin/profile" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <img
                    src={user?.avatar || '/default-avatar.png'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full ring-2 ring-neon-blue/30"
                  />
                </Link>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {location.pathname === '/admin/dashboard' ? (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Projets', value: stats.projects, icon: FaProjectDiagram, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Messages', value: stats.messages, icon: FaBell, color: 'from-purple-500 to-pink-500' },
                    { label: 'Visites', value: stats.visits, icon: FaChartLine, color: 'from-green-500 to-emerald-500' },
                    { label: 'Compétences', value: stats.skills, icon: FaUser, color: 'from-orange-500 to-red-500' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10"
                    >
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} mb-4`}>
                        <stat.icon className="text-white text-xl" />
                      </div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Notifications */}
                <div className="glass-card p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <FaBell className="mr-2 text-neon-blue" />
                    Notifications Intelligentes
                  </h2>
                  <div className="space-y-3">
                    {notifications.slice(0, 5).map((notification: any) => (
                      <NotificationBox key={notification._id} notification={notification} />
                    ))}
                    {notifications.length === 0 && (
                      <p className="text-gray-400 text-center py-8">Aucune notification pour le moment</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
