'use client';

import { motion } from 'framer-motion';

export default function SkillsMinimal() {
  const skills = [
    { name: 'Marketing Digital', level: 98, years: '3 ans' },
    { name: 'Développement Web', level: 85, years: '1+ an' },
    { name: 'Design & UI/UX', level: 92, years: '3 ans' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Compétences Clés
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {skill.name}
              </h3>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {skill.level}%
              </div>
              <div className="text-sm text-gray-600">
                {skill.years}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
