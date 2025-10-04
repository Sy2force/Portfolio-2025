import { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowLeft, HiSave, HiDocumentText, HiUser, HiFolder } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

const AdminPage = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [profileName, setProfileName] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setCvFile(file);
        toast.success(`Fichier sélectionné : ${file.name}`);
      } else {
        toast.error('Veuillez sélectionner un fichier PDF');
      }
    }
  };

  const handleSave = () => {
    console.log('=== DONNÉES ADMIN ===');
    console.log('Titre du projet:', projectTitle);
    console.log('Nom du profil:', profileName);
    console.log('Fichier CV:', cvFile ? {
      name: cvFile.name,
      size: `${(cvFile.size / 1024).toFixed(2)} KB`,
      type: cvFile.type,
    } : 'Aucun fichier');
    console.log('====================');

    toast.success('Modifications enregistrées dans la console ! 💾', {
      duration: 3000,
      icon: '✅',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors duration-300 mb-6"
          >
            <HiArrowLeft className="w-5 h-5" />
            <span>Retour au portfolio</span>
          </Link>

          <div className="flex items-center gap-4">
            <motion.div
              className="p-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiFolder className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">
                Espace Admin
              </h1>
              <p className="text-gray-400">
                Gérez vos informations rapidement et facilement
              </p>
            </div>
          </div>
        </motion.div>

        {/* Admin Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-dark-secondary/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl">
            <div className="space-y-8">
              {/* Project Title Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                  <HiFolder className="w-5 h-5 text-neon-blue" />
                  Titre du Projet
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Ex: Portfolio 2025 Futuriste"
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all duration-300"
                />
              </motion.div>

              {/* Profile Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                  <HiUser className="w-5 h-5 text-neon-purple" />
                  Nom du Profil
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Ex: Shay Acoca"
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20 transition-all duration-300"
                />
              </motion.div>

              {/* CV Upload Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                  <HiDocumentText className="w-5 h-5 text-neon-pink" />
                  Fichier CV (PDF)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label
                    htmlFor="cv-upload"
                    className="flex items-center justify-center gap-3 w-full px-4 py-4 bg-dark-primary/50 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-neon-pink hover:bg-neon-pink/5 transition-all duration-300 group"
                  >
                    <HiDocumentText className="w-6 h-6 text-neon-pink group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {cvFile ? cvFile.name : 'Cliquez pour sélectionner un PDF'}
                    </span>
                  </label>
                  {cvFile && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-2 text-sm text-gray-400 flex items-center gap-2"
                    >
                      <span>✓</span>
                      <span>{(cvFile.size / 1024).toFixed(2)} KB</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Save Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={handleSave}
                className="relative w-full group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                  <HiSave className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-lg font-display font-bold text-white">
                    💾 Sauvegarder les Modifications
                  </span>
                </div>
              </motion.button>

              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-xl"
              >
                <p className="text-sm text-gray-300 text-center">
                  💡 Les modifications seront affichées dans la console du navigateur
                  <br />
                  <span className="text-xs text-gray-400">
                    (Ouvrez les DevTools avec F12 pour voir les données)
                  </span>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-3xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { label: 'Projet', value: projectTitle || '-', icon: '📁', color: 'from-neon-blue to-neon-cyan' },
            { label: 'Profil', value: profileName || '-', icon: '👤', color: 'from-neon-purple to-neon-magenta' },
            { label: 'CV', value: cvFile ? '✓ Chargé' : '✗ Aucun', icon: '📄', color: 'from-neon-pink to-neon-orange' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="bg-dark-secondary/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl`}>
                  {stat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-sm font-medium text-white truncate">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
