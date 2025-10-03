import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCode, FaPalette, FaMobile, FaServer, FaChartLine, FaRocket } from 'react-icons/fa'

const services = [
  {
    icon: FaCode,
    title: 'Développement Web',
    description: 'Applications web modernes et performantes avec les dernières technologies',
    color: 'from-neon-blue to-neon-cyan',
    features: ['React/Next.js', 'API REST/GraphQL', 'Responsive Design'],
  },
  {
    icon: FaMobile,
    title: 'Applications Mobile',
    description: 'Apps mobiles cross-platform avec React Native',
    color: 'from-neon-purple to-neon-magenta',
    features: ['React Native', 'iOS & Android', 'Push Notifications'],
  },
  {
    icon: FaPalette,
    title: 'UI/UX Design',
    description: 'Interfaces utilisateur modernes et expériences immersives',
    color: 'from-neon-pink to-neon-orange',
    features: ['Figma Design', 'Prototypage', 'Design System'],
  },
  {
    icon: FaServer,
    title: 'Backend & API',
    description: 'Architecture backend scalable et APIs sécurisées',
    color: 'from-neon-green to-neon-blue',
    features: ['Node.js/Express', 'Microservices', 'Base de données'],
  },
  {
    icon: FaChartLine,
    title: 'SEO & Performance',
    description: 'Optimisation pour les moteurs de recherche et performance',
    color: 'from-neon-orange to-neon-yellow',
    features: ['Core Web Vitals', 'SEO Technique', 'Analytics'],
  },
  {
    icon: FaRocket,
    title: 'Consulting Tech',
    description: 'Conseils et accompagnement dans vos projets digitaux',
    color: 'from-neon-cyan to-neon-green',
    features: ['Audit Code', 'Architecture', 'Formation'],
  },
]

const ServicesPreview = () => {
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
          <span className="text-gradient">Services & Solutions</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Des solutions sur mesure pour transformer vos idées en réalité digitale
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <motion.div
              className="relative h-full p-6 glass-card-hover rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              {/* Icon Container */}
              <motion.div
                className="relative z-10 mb-4"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}>
                  <service.icon size={28} className="text-white" />
                </div>
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-display font-semibold mb-3 text-center text-white group-hover:text-gradient transition-all duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm text-center mb-4">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-1.5 h-1.5 bg-gradient-to-r ${service.color} rounded-full`} />
                    <span className="text-xs text-gray-500 font-mono">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${
                    service.color.includes('blue') ? 'rgba(0, 217, 255, 0.1)' :
                    service.color.includes('purple') ? 'rgba(168, 85, 247, 0.1)' :
                    service.color.includes('pink') ? 'rgba(236, 72, 153, 0.1)' :
                    'rgba(34, 211, 238, 0.1)'
                  } 0%, transparent 70%)`,
                }}
              />

              {/* Border Glow */}
              <motion.div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                style={{
                  background: `linear-gradient(135deg, transparent, transparent)`,
                  boxShadow: `inset 0 0 20px ${
                    service.color.includes('blue') ? 'rgba(0, 217, 255, 0.3)' :
                    service.color.includes('purple') ? 'rgba(168, 85, 247, 0.3)' :
                    service.color.includes('pink') ? 'rgba(236, 72, 153, 0.3)' :
                    'rgba(34, 211, 238, 0.3)'
                  }`,
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link to="/services">
          <motion.button
            className="group relative px-8 py-3 font-display font-semibold uppercase tracking-wider overflow-hidden rounded-lg border-2 border-neon-pink/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-neon-pink group-hover:text-white transition-colors duration-300">
              Découvrir tous les services
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-orange"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}

export default ServicesPreview
