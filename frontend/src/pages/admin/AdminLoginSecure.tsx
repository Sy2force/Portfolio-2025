import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiArrowLeft } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AdminLoginSecure = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Charger les identifiants depuis les variables d'environnement
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'un délai de vérification
    await new Promise(resolve => setTimeout(resolve, 800));

    // Vérification des identifiants
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Authentification réussie
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminEmail', email);
      toast.success('Connexion réussie ! Bienvenue 🎉', {
        duration: 3000,
        icon: '✅',
      });
      navigate('/admin');
    } else {
      // Identifiants incorrects
      toast.error('Identifiants incorrects. Veuillez réessayer.', {
        duration: 4000,
        icon: '❌',
      });
      setPassword('');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back to home link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors duration-300 mb-6"
        >
          <HiArrowLeft className="w-5 h-5" />
          <span>Retour au portfolio</span>
        </Link>

        {/* Login Card */}
        <div className="bg-dark-secondary/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-block p-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl mb-4"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <HiLockClosed className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-display font-bold text-gradient mb-2">
              Espace Admin
            </h1>
            <p className="text-gray-400">
              Connectez-vous pour accéder au dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <HiMail className="w-4 h-4 text-neon-blue" />
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@example.com"
                required
                className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all duration-300"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <HiLockClosed className="w-4 h-4 text-neon-purple" />
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20 transition-all duration-300 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? (
                    <HiEyeOff className="w-5 h-5" />
                  ) : (
                    <HiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="relative w-full group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: '200% 200%' }}
              />
              
              {/* Button content */}
              <div className="relative flex items-center justify-center gap-3 px-6 py-4 rounded-xl">
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-lg font-display font-bold text-white">
                      Connexion en cours...
                    </span>
                  </>
                ) : (
                  <>
                    <HiLockClosed className="w-5 h-5 text-white" />
                    <span className="text-lg font-display font-bold text-white">
                      Se connecter
                    </span>
                  </>
                )}
              </div>
            </motion.button>
          </form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-xl"
          >
            <p className="text-xs text-gray-400 text-center">
              🔒 Accès réservé aux administrateurs autorisés
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginSecure;
