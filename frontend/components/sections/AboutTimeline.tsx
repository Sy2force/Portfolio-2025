'use client';

import { motion } from 'framer-motion';
import { 
  BriefcaseIcon, 
  CodeBracketIcon,
  ServerIcon,
  SparklesIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const timelineEvents = [
  {
    year: '2019-2022',
    title: 'Service Militaire - Brigade Guivati',
    description: 'Acquisition de valeurs essentielles : discipline, rigueur, esprit d\'équipe et leadership. Formation au travail sous pression et développement de compétences organisationnelles.',
    icon: UserGroupIcon,
    color: 'bg-green-500'
  },
  {
    year: '2022-2023',
    title: 'Autoformation Design & Marketing',
    description: 'Apprentissage autodidacte via YouTube et documentation. Développement de premiers sites web et création d\'identités visuelles. Découverte du marketing digital et création de contenu.',
    icon: CodeBracketIcon,
    color: 'bg-purple-500'
  },
  {
    year: 'Mars-Août 2024',
    title: 'Formation Marketing Digital Intensive',
    description: 'Formation complète : SEO/SEM, Social Media Marketing, Google Ads, Facebook/LinkedIn Ads, Analytics. 20+ cas pratiques réalisés. Certifications obtenues avec approche pratique.',
    icon: BriefcaseIcon,
    color: 'bg-blue-500'
  },
  {
    year: 'Nov 2024 - Jan 2026',
    title: 'Programme Full-Stack HackerU',
    description: 'Formation intensive en cours (actuellement Oct 2025). Technologies : React, Node.js, TypeScript, MongoDB, Tailwind. Excellentes notes et forte implication. Certification prévue janvier 2026.',
    icon: ServerIcon,
    color: 'bg-orange-500'
  },
  {
    year: '2024-Présent',
    title: 'Expert Marketing & Développeur',
    description: 'Combinaison unique marketing digital et développement full-stack. Création de solutions complètes pour entreprises, Portfolio 2025 et 150+ clients actifs.',
    icon: SparklesIcon,
    color: 'bg-pink-500'
  }
];

const AboutTimeline = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Mon Parcours Professionnel
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            De service militaire à expert en marketing digital et développement full-stack,
            découvrez mon parcours unique combinant créativité et technologie.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-200 via-purple-400 to-pink-200" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className={`bg-white rounded-xl shadow-lg p-6 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} max-w-md`}>
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                      <span className={`p-2 rounded-lg text-white ${event.color}`}>
                        <event.icon className="w-5 h-5" />
                      </span>
                      <span className="text-sm font-bold text-blue-600">{event.year}</span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-neutral-600">{event.description}</p>
                  </div>
                </div>
                {/* Center Dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-4 h-4 rounded-full border-4 border-white ${event.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Ma détermination</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Déterminé à combiner marketing et développement pour créer des solutions complètes et performantes.
            Mon objectif : devenir un expert full-stack certifié tout en continuant à exceller en marketing digital
            et création de contenu viral.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutTimeline;
