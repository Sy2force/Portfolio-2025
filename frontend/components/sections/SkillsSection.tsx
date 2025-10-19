'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/hooks/useTranslation';
import Card from '@/components/ui/Card';

interface Skill {
  category: string;
  items: {
    name: string;
    level: number;
    color: string;
  }[];
}

const skills: Skill[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React/Next.js', level: 90, color: 'from-blue-400 to-blue-600' },
      { name: 'TypeScript', level: 85, color: 'from-blue-500 to-blue-700' },
      { name: 'Tailwind CSS', level: 95, color: 'from-teal-400 to-teal-600' },
      { name: 'Framer Motion', level: 80, color: 'from-purple-400 to-purple-600' },
    ]
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js/Express', level: 85, color: 'from-green-400 to-green-600' },
      { name: 'MongoDB', level: 80, color: 'from-green-500 to-green-700' },
      { name: 'PostgreSQL', level: 75, color: 'from-blue-400 to-blue-600' },
      { name: 'GraphQL', level: 70, color: 'from-pink-400 to-pink-600' },
    ]
  },
  {
    category: 'Marketing Digital',
    items: [
      { name: 'Meta Ads', level: 95, color: 'from-blue-400 to-blue-600' },
      { name: 'Google Ads', level: 90, color: 'from-yellow-400 to-orange-600' },
      { name: 'SEO/SEM', level: 85, color: 'from-green-400 to-green-600' },
      { name: 'Analytics', level: 88, color: 'from-purple-400 to-purple-600' },
    ]
  },
  {
    category: 'Design',
    items: [
      { name: 'Figma', level: 90, color: 'from-purple-400 to-pink-600' },
      { name: 'Adobe Suite', level: 85, color: 'from-red-400 to-red-600' },
      { name: 'UI/UX Design', level: 80, color: 'from-indigo-400 to-indigo-600' },
      { name: 'Canva', level: 95, color: 'from-cyan-400 to-cyan-600' },
    ]
  }
];

export default function SkillsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('about.skills.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stack technique complète et expertise marketing digital
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, x: groupIndex % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
            >
              <Card glass className="h-full">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {skillGroup.category}
                </h3>
                <div className="space-y-4">
                  {skillGroup.items.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
                        >
                          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <Card gradient className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Certifications & Formations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <div className="text-4xl mb-2">🎓</div>
                <h4 className="font-semibold text-gray-900 dark:text-white">HackerU</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Formation Full-Stack (400h)</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">2024-2026</p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-2">📱</div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Meta Blueprint</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Marketing Digital Avancé</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Certifié 2023</p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-2">🎨</div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Figma</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">UI/UX Design Professional</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Certifié 2023</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
