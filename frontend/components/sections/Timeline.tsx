'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BriefcaseIcon, AcademicCapIcon, StarIcon } from '@heroicons/react/24/outline';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  type: 'work' | 'education' | 'achievement';
  icon: React.ReactNode;
}

const events: TimelineEvent[] = [
  {
    id: '1',
    year: '2024 - Présent',
    title: 'Formation Full-Stack Developer',
    organization: 'HackerU',
    description: 'Formation intensive de 400h en développement web moderne: React, Node.js, MongoDB, TypeScript',
    type: 'education',
    icon: <AcademicCapIcon className="w-6 h-6" />
  },
  {
    id: '2',
    year: '2022 - 2024',
    title: 'Expert Marketing Digital',
    organization: 'Bezeq',
    description: 'Gestion de campagnes digitales, optimisation SEO/SEM, analytics et stratégies de croissance',
    type: 'work',
    icon: <BriefcaseIcon className="w-6 h-6" />
  },
  {
    id: '3',
    year: '2023',
    title: 'Certifications Professionnelles',
    organization: 'Meta & Figma',
    description: 'Meta Blueprint Marketing Digital Avancé + Figma UI/UX Design Professional',
    type: 'achievement',
    icon: <StarIcon className="w-6 h-6" />
  },
  {
    id: '4',
    year: '2021 - 2022',
    title: 'Freelance Marketing & Design',
    organization: 'Indépendant',
    description: 'Création de contenus, branding, campagnes publicitaires pour 30+ clients',
    type: 'work',
    icon: <BriefcaseIcon className="w-6 h-6" />
  },
  {
    id: '5',
    year: '2019 - 2022',
    title: 'Service Militaire',
    organization: 'Tsahal',
    description: 'Service dans les forces de défense israéliennes, développement du leadership et travail en équipe',
    type: 'achievement',
    icon: <StarIcon className="w-6 h-6" />
  }
];

const typeColors = {
  work: 'from-blue-500 to-blue-700',
  education: 'from-green-500 to-green-700',
  achievement: 'from-purple-500 to-purple-700'
};

export default function Timeline() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mon Parcours
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Expériences professionnelles et formations
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30" />

          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex gap-6 mb-12"
            >
              {/* Icon Circle */}
              <div className={`relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-r ${typeColors[event.type]} rounded-full flex items-center justify-center text-white shadow-lg`}>
                {event.icon}
                <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-20" />
              </div>

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {event.organization}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    {event.year}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {event.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
