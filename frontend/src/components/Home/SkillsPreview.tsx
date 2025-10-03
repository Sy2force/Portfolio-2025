import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  SiReact, SiTypescript, SiJavascript, SiNodedotjs, 
  SiMongodb, SiPostgresql, SiTailwindcss, SiNextdotjs,
  SiPython, SiDocker, SiGit, SiFigma
} from 'react-icons/si'

const skills = [
  { icon: SiReact, name: 'React', level: 95, color: '#61DAFB' },
  { icon: SiTypescript, name: 'TypeScript', level: 90, color: '#3178C6' },
  { icon: SiJavascript, name: 'JavaScript', level: 95, color: '#F7DF1E' },
  { icon: SiNodedotjs, name: 'Node.js', level: 85, color: '#339933' },
  { icon: SiNextdotjs, name: 'Next.js', level: 80, color: '#ffffff' },
  { icon: SiTailwindcss, name: 'Tailwind', level: 90, color: '#06B6D4' },
  { icon: SiMongodb, name: 'MongoDB', level: 75, color: '#47A248' },
  { icon: SiPostgresql, name: 'PostgreSQL', level: 70, color: '#4169E1' },
  { icon: SiPython, name: 'Python', level: 65, color: '#3776AB' },
  { icon: SiDocker, name: 'Docker', level: 70, color: '#2496ED' },
  { icon: SiGit, name: 'Git', level: 85, color: '#F05032' },
  { icon: SiFigma, name: 'Figma', level: 75, color: '#F24E1E' },
]

const SkillsPreview = () => {
  return (
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
          <span className="text-gradient">Compétences Tech</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Maîtrise des technologies modernes pour créer des solutions innovantes
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              delay: index * 0.05, 
              duration: 0.5,
              type: 'spring',
              stiffness: 200
            }}
            viewport={{ once: true }}
            className="group relative"
          >
            <motion.div
              className="relative p-6 glass-card rounded-xl cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Skill Icon */}
              <motion.div
                className="relative z-10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <skill.icon 
                  size={40} 
                  className="mx-auto mb-2 transition-all duration-300"
                  style={{ color: skill.color }}
                />
              </motion.div>
              
              {/* Skill Name */}
              <p className="text-xs font-mono text-center text-gray-400 group-hover:text-white transition-colors duration-300">
                {skill.name}
              </p>
              
              {/* Skill Level */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue to-neon-purple"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: skill.level / 100 }}
                transition={{ delay: index * 0.05 + 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                style={{ transformOrigin: 'left' }}
              />
              
              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${skill.color}40, transparent)`,
                }}
              />
              
              {/* Percentage Display on Hover */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-dark-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              >
                <span className="text-2xl font-bold" style={{ color: skill.color }}>
                  {skill.level}%
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Frontend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Backend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neon-pink rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Tools</span>
          </div>
        </div>

        <Link to="/skills">
          <motion.button
            className="group relative px-8 py-3 font-display font-semibold uppercase tracking-wider overflow-hidden rounded-lg border-2 border-neon-purple/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-neon-purple group-hover:text-white transition-colors duration-300">
              Voir toutes les compétences
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink"
              initial={{ y: '100%' }}
              whileHover={{ y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default SkillsPreview
