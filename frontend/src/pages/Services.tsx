import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  FaCode, FaPalette, FaMobile, FaServer, FaChartLine, 
  FaRocket, FaCheckCircle, FaArrowRight
} from 'react-icons/fa'

const services = [
  {
    id: 1,
    icon: FaCode,
    title: 'Développement Web Full Stack',
    shortDescription: 'Applications web modernes et performantes',
    description: 'Création d\'applications web complètes avec les dernières technologies. Architecture scalable, code maintenable et performances optimisées.',
    features: [
      'Applications React/Next.js',
      'API REST & GraphQL',
      'Architecture microservices',
      'Intégration de paiement',
      'Authentification sécurisée',
      'Déploiement CI/CD'
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    price: 'À partir de 5000€',
    duration: '2-6 mois',
    color: 'from-neon-blue to-neon-cyan',
  },
  {
    id: 2,
    icon: FaMobile,
    title: 'Applications Mobiles',
    shortDescription: 'Apps iOS & Android cross-platform',
    description: 'Développement d\'applications mobiles natives et cross-platform avec React Native. UI/UX optimisée pour mobile.',
    features: [
      'React Native development',
      'iOS & Android natif',
      'Push notifications',
      'Offline capabilities',
      'App Store optimization',
      'Analytics integration'
    ],
    technologies: ['React Native', 'Expo', 'Firebase', 'Redux'],
    price: 'À partir de 8000€',
    duration: '3-6 mois',
    color: 'from-neon-purple to-neon-magenta',
  },
  {
    id: 3,
    icon: FaPalette,
    title: 'UI/UX Design',
    shortDescription: 'Interfaces modernes et expériences utilisateur',
    description: 'Conception d\'interfaces utilisateur intuitives et esthétiques. Prototypage, design systems et tests utilisateurs.',
    features: [
      'Design thinking workshops',
      'Wireframing & prototypage',
      'Design systems complets',
      'Tests utilisateurs',
      'Responsive design',
      'Animation & interactions'
    ],
    technologies: ['Figma', 'Adobe XD', 'Framer', 'Principle'],
    price: 'À partir de 3000€',
    duration: '1-3 mois',
    color: 'from-neon-pink to-neon-orange',
  },
  {
    id: 4,
    icon: FaServer,
    title: 'Backend & API Development',
    shortDescription: 'APIs robustes et architecture scalable',
    description: 'Développement d\'APIs RESTful et GraphQL sécurisées. Architecture microservices et intégrations tierces.',
    features: [
      'API REST & GraphQL',
      'Microservices architecture',
      'Database design',
      'Authentication & authorization',
      'Third-party integrations',
      'API documentation'
    ],
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'Redis'],
    price: 'À partir de 4000€',
    duration: '1-4 mois',
    color: 'from-neon-green to-neon-blue',
  },
  {
    id: 5,
    icon: FaChartLine,
    title: 'SEO & Performance',
    shortDescription: 'Optimisation pour moteurs de recherche',
    description: 'Optimisation technique SEO et performance web. Amélioration des Core Web Vitals et du référencement naturel.',
    features: [
      'Audit SEO technique',
      'Core Web Vitals optimization',
      'Schema markup',
      'Content optimization',
      'Link building strategy',
      'Performance monitoring'
    ],
    technologies: ['Google Analytics', 'Search Console', 'GTmetrix'],
    price: 'À partir de 2000€',
    duration: '1-2 mois',
    color: 'from-neon-orange to-neon-yellow',
  },
  {
    id: 6,
    icon: FaRocket,
    title: 'Consulting & Formation',
    shortDescription: 'Accompagnement technique et stratégique',
    description: 'Conseil en architecture technique, revue de code et formation d\'équipes. Accompagnement dans la transformation digitale.',
    features: [
      'Architecture review',
      'Code review & audit',
      'Team training',
      'Technology selection',
      'Best practices implementation',
      'Agile methodology'
    ],
    technologies: ['Selon vos besoins'],
    price: '800€/jour',
    duration: 'Flexible',
    color: 'from-neon-cyan to-neon-green',
  },
]

const processSteps = [
  { step: 1, title: 'Discussion', description: 'Analyse de vos besoins et objectifs' },
  { step: 2, title: 'Proposition', description: 'Solution personnalisée et devis détaillé' },
  { step: 3, title: 'Développement', description: 'Création itérative avec feedback régulier' },
  { step: 4, title: 'Livraison', description: 'Déploiement et formation utilisateur' },
  { step: 5, title: 'Support', description: 'Maintenance et évolutions futures' },
]

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="text-gradient">Services & Solutions</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Des solutions sur mesure pour transformer vos idées en réalité digitale
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              className="group cursor-pointer"
            >
              <motion.div
                className="relative h-full glass-card-hover rounded-2xl p-6 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                animate={{
                  height: selectedService === service.id ? 'auto' : 'auto',
                }}
              >
                {/* Icon */}
                <motion.div
                  className="mb-4"
                  animate={{
                    rotate: hoveredService === service.id ? 360 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}>
                    <service.icon size={28} className="text-white" />
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-gray-400 text-sm mb-4">
                  {service.shortDescription}
                </p>

                {/* Price & Duration */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-neon-blue font-mono text-sm">{service.price}</span>
                  <span className="text-gray-500 text-xs">{service.duration}</span>
                </div>

                {/* Expanded Content */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: selectedService === service.id ? 'auto' : 0,
                    opacity: selectedService === service.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-gray-300 text-sm mb-4">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-display font-semibold text-neon-purple mb-2">
                        Inclus:
                      </h4>
                      <ul className="space-y-1">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <FaCheckCircle className="text-neon-green text-xs mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-gray-400">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs font-mono glass-card rounded text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Learn More */}
                <motion.div
                  className="flex items-center gap-2 text-sm font-mono text-neon-blue group-hover:text-neon-purple transition-colors duration-300"
                  animate={{
                    x: hoveredService === service.id ? 5 : 0,
                  }}
                >
                  <span>{selectedService === service.id ? 'Voir moins' : 'En savoir plus'}</span>
                  <FaArrowRight className={`transition-transform duration-300 ${
                    selectedService === service.id ? 'rotate-90' : ''
                  }`} />
                </motion.div>

                {/* Background Glow */}
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${
                      hoveredService === service.id 
                        ? 'rgba(0, 217, 255, 0.1)' 
                        : 'transparent'
                    } 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-display font-bold text-center mb-12"
        >
          <span className="text-gradient">Notre Processus</span>
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative flex-1 text-center"
            >
              {/* Step Number */}
              <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-2xl font-display font-bold text-white">
                  {step.step}
                </span>
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-display font-semibold text-white mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 max-w-xs mx-auto">
                {step.description}
              </p>

              {/* Connector */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple transform -translate-x-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center glass-card rounded-2xl p-12"
        >
          <h2 className="text-3xl font-display font-bold mb-6">
            <span className="text-gradient">Prêt à démarrer votre projet ?</span>
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Discutons de vos besoins et trouvons ensemble la meilleure solution pour votre projet
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-display font-semibold uppercase tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Demander un devis gratuit
            <FaArrowRight />
          </motion.a>
        </motion.div>
      </section>
    </motion.div>
  )
}

export default Services
