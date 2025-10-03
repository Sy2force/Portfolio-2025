import { motion } from 'framer-motion';
import { useState } from 'react';
import { profileData } from '../../data/profile';

const SkillsGrid = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  
  const categories = [
    { id: 'frontend', label: 'Frontend', icon: '🎨' },
    { id: 'backend', label: 'Backend', icon: '⚙️' },
    { id: 'tools', label: 'DevOps & Tools', icon: '🛠' },
    { id: 'marketing', label: 'Marketing', icon: '📈' },
  ];

  const getSkillsForCategory = () => {
    switch(activeCategory) {
      case 'frontend': return profileData.skills.frontend;
      case 'backend': return profileData.skills.backend;
      case 'tools': return profileData.skills.tools;
      case 'marketing': return profileData.skills.marketing;
      default: return profileData.skills.frontend;
    }
  };

  return (
    <div className="py-16">
      {/* Category Tabs */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeCategory === category.id
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">{category.icon}</span>
              {category.label}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        layout
      >
        {getSkillsForCategory().map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)'
            }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-neon-blue/50 transition-all">
              {/* Icon */}
              <div className="text-4xl mb-4">{skill.icon}</div>
              
              {/* Skill Name */}
              <h3 className="text-lg font-semibold text-white mb-3">{skill.name}</h3>
              
              {/* Progress Bar */}
              <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-blue to-neon-purple"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: index * 0.05 + 0.3, duration: 1, ease: "easeOut" }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
                </motion.div>
              </div>
              
              {/* Level */}
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">Maîtrise</span>
                <span className="text-sm font-bold text-neon-blue">{skill.level}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Autres compétences</h3>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {['Python', 'Docker', 'CI/CD', 'Jest', 'Playwright', 'Figma', 'Adobe XD', 'Notion', 'Slack', 'Trello'].map((skill) => (
            <motion.span
              key={skill}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-white/5 backdrop-blur-lg rounded-full text-gray-300 border border-white/10 hover:border-neon-blue/50 hover:text-neon-blue transition-all"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsGrid;
