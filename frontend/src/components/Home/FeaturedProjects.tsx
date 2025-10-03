import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Plateforme e-commerce moderne avec paiement intégré, gestion des stocks et tableau de bord admin.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-neon-blue to-neon-cyan',
  },
  {
    id: 2,
    title: 'AI Dashboard',
    description: 'Dashboard analytique avec visualisations en temps réel et prédictions basées sur l\'IA.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    technologies: ['React', 'Python', 'TensorFlow', 'D3.js'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-neon-purple to-neon-magenta',
  },
  {
    id: 3,
    title: 'Social Network',
    description: 'Réseau social nouvelle génération avec messagerie en temps réel et partage de contenu.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Socket.io'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    color: 'from-neon-pink to-neon-orange',
  },
]

const FeaturedProjects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

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
          <span className="text-gradient">Projets Récents</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Découvrez mes dernières créations alliant innovation et performance
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            className="group relative"
          >
            <motion.div
              className="relative overflow-hidden rounded-2xl glass-card-hover"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
                
                {/* Tech Stack Overlay */}
                <motion.div
                  className="absolute inset-0 bg-dark-primary/90 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap gap-2 p-4">
                    {project.technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ 
                          scale: hoveredProject === project.id ? 1 : 0,
                          rotate: hoveredProject === project.id ? 0 : -180
                        }}
                        transition={{ delay: i * 0.05 }}
                        className="px-3 py-1 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/50 rounded-full text-xs font-mono"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold mb-2 text-white group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-neon-blue transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub size={18} />
                    <span className="text-sm font-mono">Code</span>
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-neon-purple transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt size={16} />
                    <span className="text-sm font-mono">Demo</span>
                  </motion.a>
                </div>
              </div>

              {/* Holographic Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(105deg, transparent 40%, ${
                    hoveredProject === project.id ? 'rgba(0, 217, 255, 0.1)' : 'transparent'
                  } 50%, transparent 60%)`,
                }}
                animate={{
                  x: hoveredProject === project.id ? '100%' : '-100%',
                }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>

            {/* Glow Effect */}
            <motion.div
              className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
            />
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link to="/projects">
          <motion.button
            className="group relative px-8 py-3 font-display font-semibold uppercase tracking-wider overflow-hidden rounded-lg border-2 border-neon-blue/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-neon-blue group-hover:text-white transition-colors duration-300">
              Voir tous les projets
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default FeaturedProjects
