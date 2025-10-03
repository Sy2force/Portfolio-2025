import { motion } from 'framer-motion';
import { FaDownload, FaExpand, FaEye, FaFilePdf, FaShare } from 'react-icons/fa';
import { useState } from 'react';
import { profileData } from '../../data/profile';

const CVViewer = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [downloadCount, setDownloadCount] = useState(127); // Simulated count

  const handleDownload = () => {
    setDownloadCount(prev => prev + 1);
    // Track download event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'download_cv', {
        event_category: 'engagement',
        event_label: 'CV Download'
      });
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mon <span className="text-gradient">CV</span>
          </h2>
          <p className="text-xl text-gray-400">
            Téléchargez mon CV complet pour plus de détails
          </p>
        </motion.div>

        {/* CV Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-2xl blur-2xl" />
          
          <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
            {/* PDF Preview */}
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Info */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-3xl font-bold text-white mb-2">{profileData.name}</h3>
                    <p className="text-xl text-neon-blue mb-6">{profileData.title}</p>
                    
                    <div className="space-y-4 mb-8">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Résumé</h4>
                        <p className="text-gray-300">{profileData.longBio}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Compétences Principales</h4>
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills.frontend.slice(0, 5).map(skill => (
                            <span key={skill.name} className="px-3 py-1 bg-neon-blue/10 rounded-full text-neon-blue text-sm">
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">Langues</h4>
                        <div className="space-y-1">
                          {profileData.languages.map(lang => (
                            <div key={lang.name} className="flex items-center gap-2">
                              <span className="text-xl">{lang.flag}</span>
                              <span className="text-gray-300">{lang.name}</span>
                              <span className="text-gray-500 text-sm">• {lang.level}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Preview Image */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 rounded-xl p-8 border border-white/10">
                    <FaFilePdf className="text-6xl text-neon-blue mb-4 mx-auto" />
                    <p className="text-center text-gray-400 mb-4">Document PDF • 2 pages</p>
                    
                    {/* Stats */}
                    <div className="flex justify-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <FaEye />
                        <span>{downloadCount * 3} vues</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaDownload />
                        <span>{downloadCount} téléchargements</span>
                      </div>
                    </div>
                  </div>

                  {/* Preview Button */}
                  <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FaExpand />
                    Aperçu plein écran
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 bg-gradient-to-r from-neon-blue/5 to-neon-purple/5 border-t border-white/10">
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/cv.pdf" download onClick={handleDownload}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-white font-semibold flex items-center gap-2 hover:shadow-neon transition-all"
                  >
                    <FaDownload />
                    Télécharger le CV
                  </motion.button>
                </a>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    navigator.share({
                      title: `CV - ${profileData.name}`,
                      text: profileData.bio,
                      url: window.location.href
                    });
                  }}
                  className="px-8 py-3 border-2 border-neon-blue rounded-full text-neon-blue font-semibold flex items-center gap-2 hover:bg-neon-blue/10 transition-all"
                >
                  <FaShare />
                  Partager
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {profileData.certifications.map((cert) => (
            <motion.div
              key={cert}
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10"
            >
              <div className="text-2xl mb-2">🏆</div>
              <p className="text-sm text-gray-300">{cert}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <p className="text-gray-800 text-center">Aperçu PDF ici</p>
            <button
              className="mt-4 px-6 py-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-white"
              onClick={() => setIsPreviewOpen(false)}
            >
              Fermer
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default CVViewer;
