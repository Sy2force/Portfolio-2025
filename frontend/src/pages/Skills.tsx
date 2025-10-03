import { motion } from 'framer-motion'
import SkillsGrid from '../components/Skills/SkillsGrid'
import { profileData } from '../data/profile'
import { SEO } from '../utils/seo'

const Skills = () => {

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Compétences - Shaya Coca"
        description="Expert React, Node.js, MongoDB | Spécialisé UI/UX futuriste, SEO, Growth, IA"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Mes <span className="text-gradient">Compétences</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {profileData.bio}
          </p>
        </motion.div>

        {/* Skills Grid Component */}
        <SkillsGrid />

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Mes <span className="text-gradient">Valeurs</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profileData.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-neon-blue/50 transition-all text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Skills
