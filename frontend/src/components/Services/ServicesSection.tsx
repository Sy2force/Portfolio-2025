import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaRocket, FaCode, FaPalette, FaChartLine, FaRobot, FaSearch } from 'react-icons/fa';
import { profileData } from '../../data/profile';
import { Link } from 'react-router-dom';

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getIcon = (iconEmoji: string) => {
    switch(iconEmoji) {
      case '🚀': return <FaRocket className="text-3xl" />;
      case '⚙️': return <FaCode className="text-3xl" />;
      case '✨': return <FaPalette className="text-3xl" />;
      case '📈': return <FaChartLine className="text-3xl" />;
      case '🤖': return <FaRobot className="text-3xl" />;
      case '🔍': return <FaSearch className="text-3xl" />;
      default: return <span className="text-3xl">{iconEmoji}</span>;
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Services <span className="text-gradient">Premium</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Solutions sur mesure pour transformer vos idées en réalité digitale
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {profileData.services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-full p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-neon-blue/50 transition-all duration-300">
                {/* Icon */}
                <motion.div
                  animate={{ 
                    rotate: hoveredIndex === index ? 360 : 0,
                    scale: hoveredIndex === index ? 1.1 : 1
                  }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 mb-6 bg-gradient-to-br from-neon-blue to-neon-purple rounded-xl flex items-center justify-center text-white"
                >
                  {getIcon(service.icon)}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6">
                  {service.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-neon-blue/10 rounded-md text-neon-blue text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Duration & Price */}
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
                  <div>
                    <p className="text-xs text-gray-500">Durée</p>
                    <p className="text-sm font-semibold text-white">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">À partir de</p>
                    <p className="text-sm font-bold text-neon-blue">{service.price}</p>
                  </div>
                </div>

                {/* CTA Button */}
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-lg text-white font-medium hover:from-neon-blue/30 hover:to-neon-purple/30 transition-all border border-white/10 hover:border-neon-blue/50"
                  >
                    Demander un devis
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            Mon Process en <span className="text-gradient">5 Étapes</span>
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              { step: 1, title: 'Discovery', desc: 'Analyse des besoins' },
              { step: 2, title: 'Design', desc: 'Maquettes & prototypes' },
              { step: 3, title: 'Development', desc: 'Code & intégration' },
              { step: 4, title: 'Testing', desc: 'Tests & optimisation' },
              { step: 5, title: 'Launch', desc: 'Déploiement & suivi' },
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-4 h-0.5 bg-gradient-to-r from-neon-blue to-transparent" />
                )}
                
                <div className="flex flex-col items-center p-4">
                  <div className="w-16 h-16 mb-3 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {phase.step}
                  </div>
                  <h4 className="text-white font-semibold">{phase.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-xl text-gray-400 mb-6">
            Prêt à démarrer votre projet ?
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-white font-semibold hover:shadow-neon transition-all"
            >
              Discutons de votre projet 🚀
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
