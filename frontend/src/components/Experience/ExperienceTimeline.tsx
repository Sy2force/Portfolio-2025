import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaAward, FaCalendar } from 'react-icons/fa';

const experiences = [
  {
    type: 'work',
    title: 'Full Stack Developer Senior',
    company: 'Tech Solutions Paris',
    period: '2022 - Présent',
    description: 'Développement d\'applications React/Node.js complexes, architecture microservices, leadership technique.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Docker', 'AWS'],
    icon: FaBriefcase,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'work',
    title: 'Digital Marketing Manager',
    company: 'Growth Agency',
    period: '2020 - 2022',
    description: 'Stratégies SEO/SEA, automation marketing, analytics avancées, croissance 300% du trafic organique.',
    technologies: ['Google Ads', 'Analytics', 'HubSpot', 'SEMrush'],
    icon: FaBriefcase,
    color: 'from-purple-500 to-pink-500'
  },
  {
    type: 'education',
    title: 'Master Informatique & IA',
    company: 'Université Paris-Saclay',
    period: '2018 - 2020',
    description: 'Spécialisation en intelligence artificielle, machine learning et développement full-stack.',
    technologies: ['Python', 'TensorFlow', 'React', 'Node.js'],
    icon: FaGraduationCap,
    color: 'from-green-500 to-emerald-500'
  },
  {
    type: 'certification',
    title: 'AWS Certified Developer',
    company: 'Amazon Web Services',
    period: '2023',
    description: 'Certification officielle AWS pour le développement d\'applications cloud scalables.',
    technologies: ['AWS', 'Lambda', 'S3', 'DynamoDB'],
    icon: FaAward,
    color: 'from-orange-500 to-red-500'
  }
];

const ExperienceTimeline = () => {
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
            Mon <span className="text-gradient">Parcours</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Une combinaison unique de développement technique et marketing digital
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink opacity-30" />

          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center mb-12 ${
                  isLeft ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}
                >
                  <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-neon-blue/50 transition-all">
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'justify-end' : ''}`}>
                      <span className={`px-3 py-1 bg-gradient-to-r ${exp.color} rounded-full text-white text-xs font-medium`}>
                        {exp.type === 'work' && 'Expérience'}
                        {exp.type === 'education' && 'Formation'}
                        {exp.type === 'certification' && 'Certification'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                    <p className="text-neon-blue font-medium mb-2">{exp.company}</p>
                    
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                      <FaCalendar className="text-xs" />
                      {exp.period}
                    </div>

                    <p className="text-gray-400 text-sm mb-4">{exp.description}</p>

                    <div className="flex flex-wrap gap-2 justify-end">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-neon-blue/10 rounded text-neon-blue text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-2/12 flex justify-center relative z-10"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${exp.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <Icon className="text-white text-xl" />
                  </div>
                </motion.div>

                {/* Empty space for the other side */}
                <div className="w-5/12" />
              </motion.div>
            );
          })}
        </div>

        {/* Download CV Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="/cv.pdf" download>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-white font-semibold hover:shadow-neon transition-all"
            >
              📄 Télécharger mon CV complet
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
