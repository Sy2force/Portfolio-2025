import { motion } from 'framer-motion'
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa'
import { useState } from 'react'

const timeline = [
  {
    year: '2024',
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    description: 'Lead developer sur des projets d\'envergure internationale',
    icon: FaBriefcase,
    color: 'from-neon-blue to-neon-cyan',
  },
  {
    year: '2022',
    title: 'Full Stack Developer',
    company: 'Digital Agency',
    description: 'Développement d\'applications web complexes pour clients Fortune 500',
    icon: FaBriefcase,
    color: 'from-neon-purple to-neon-magenta',
  },
  {
    year: '2020',
    title: 'Frontend Developer',
    company: 'StartUp Studio',
    description: 'Création d\'interfaces utilisateur modernes et responsive',
    icon: FaBriefcase,
    color: 'from-neon-pink to-neon-orange',
  },
  {
    year: '2018',
    title: 'Master Informatique',
    company: 'Université Paris',
    description: 'Spécialisation en Intelligence Artificielle et Web Technologies',
    icon: FaGraduationCap,
    color: 'from-neon-green to-neon-blue',
  },
]

const values = [
  {
    icon: '🚀',
    title: 'Innovation',
    description: 'Toujours à la recherche des dernières technologies',
  },
  {
    icon: '💎',
    title: 'Qualité',
    description: 'Code propre, scalable et maintenable',
  },
  {
    icon: '🤝',
    title: 'Collaboration',
    description: 'Travail d\'équipe et communication transparente',
  },
  {
    icon: '🎯',
    title: 'Résultats',
    description: 'Focus sur la livraison de valeur business',
  },
]

const About = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null)

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
            <span className="text-gradient">À Propos</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionné par la création d'expériences digitales exceptionnelles
          </p>
        </motion.div>

        {/* Introduction */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden glass-card">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/80 to-transparent" />
              </div>
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-24 h-24 border-2 border-neon-blue/50 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-neon-purple/50"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-display font-bold">
              Hello, je suis <span className="text-gradient">Shay Acoca</span>
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Digital Marketer & Full Stack Developer passionné avec plus de 6 ans d'expérience dans la création 
              d'applications web modernes et performantes. Expert en React, Node.js, marketing digital et technologies cloud.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Mon approche combine créativité, innovation technique et stratégies marketing pour créer 
              des solutions digitales qui génèrent des résultats business concrets.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-neon-blue">50+</div>
                <div className="text-sm text-gray-400">Projets</div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-neon-purple">30+</div>
                <div className="text-sm text-gray-400">Clients</div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-neon-pink">6+</div>
                <div className="text-sm text-gray-400">Années</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-display font-bold text-center mb-12"
        >
          <span className="text-gradient">Mon Parcours</span>
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink" />

          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <motion.div
                className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedYear(selectedYear === item.year ? null : item.year)}
              >
                <div className={`glass-card-hover p-6 rounded-xl cursor-pointer ${
                  selectedYear === item.year ? 'border-2 border-neon-blue' : ''
                }`}>
                  <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'justify-end' : ''}`}>
                    <item.icon className="text-2xl text-neon-blue" />
                    <h3 className="text-xl font-display font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-neon-purple font-mono text-sm mt-1">{item.company}</p>
                  <p className="text-gray-400 text-sm mt-2">{item.description}</p>
                </div>
              </motion.div>

              {/* Center Circle */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4"
                whileHover={{ scale: 1.5 }}
              >
                <div className={`w-full h-full bg-gradient-to-br ${item.color} rounded-full`} />
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-full`}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Year */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 ${
                index % 2 === 0 ? '-translate-y-8' : 'translate-y-8'
              }`}>
                <span className="text-xs font-mono text-gray-500">{item.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-display font-bold text-center mb-12"
        >
          <span className="text-gradient">Mes Valeurs</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="glass-card p-6 rounded-xl text-center"
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                {value.icon}
              </motion.div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}

export default About
