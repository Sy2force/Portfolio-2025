'use client';

import { motion } from 'framer-motion';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';

export default function SkillsComplete() {
  const skillCategories = [
    {
      title: 'Marketing Digital',
      experience: '3 ans',
      skills: ['Content Marketing', 'SEO/SEM', 'Social Media', 'Google Analytics'],
      level: 98
    },
    {
      title: 'Développement Web',
      experience: '1+ an',
      skills: ['React', 'Next.js', 'Node.js', 'TypeScript'],
      level: 85
    },
    {
      title: 'Design & UI/UX',
      experience: '3 ans',
      skills: ['Figma', 'Web Design', 'Responsive', 'UI/UX'],
      level: 92
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Compétences Clés
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expertise en création de contenu et développement full-stack
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <CheckBadgeIcon className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.experience} d'expérience</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Niveau</span>
                  <span className="text-sm font-bold text-blue-600">{category.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.level}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="bg-blue-600 h-2 rounded-full"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                {category.skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
