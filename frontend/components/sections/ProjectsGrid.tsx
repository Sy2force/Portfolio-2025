'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import Card from '@/components/ui/Card';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  stats?: {
    users?: string;
    conversion?: string;
    performance?: string;
  };
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Arrow Agency',
    description: 'Plateforme de marketing digital avec dashboard analytics',
    image: '/images/projects/arrow-agency.jpg',
    category: 'saas',
    technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
    liveUrl: 'https://arrow-agency.com',
    githubUrl: 'https://github.com/shayacoca/arrow-agency',
    stats: {
      users: '500+',
      conversion: '+45%',
      performance: '98/100'
    }
  },
  {
    id: '2',
    title: 'JetsetPack',
    description: 'E-commerce de produits de voyage premium',
    image: '/images/projects/jetsetpack.jpg',
    category: 'ecommerce',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'],
    liveUrl: 'https://jetsetpack.com',
    stats: {
      users: '2K+',
      conversion: '+65%',
      performance: '95/100'
    }
  },
  {
    id: '3',
    title: '1948 Agency',
    description: 'Site vitrine pour agence de communication',
    image: '/images/projects/1948-agency.jpg',
    category: 'web',
    technologies: ['WordPress', 'PHP', 'MySQL', 'GSAP'],
    liveUrl: 'https://1948agency.com',
    stats: {
      users: '1K+',
      conversion: '+30%',
      performance: '92/100'
    }
  },
  {
    id: '4',
    title: 'Koogoo Box',
    description: 'Application mobile de gestion de contenus',
    image: '/images/projects/koogoo-box.jpg',
    category: 'pwa',
    technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
    liveUrl: 'https://koogoobox.app',
    githubUrl: 'https://github.com/shayacoca/koogoo-box',
    stats: {
      users: '800+',
      performance: '90/100'
    }
  }
];

const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'saas', label: 'SaaS' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'web', label: 'Sites Web' },
  { id: 'pwa', label: 'PWA' }
];

export default function ProjectsGrid() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.label}
              <span className="ml-2 text-sm opacity-60">
                ({category.id === 'all' ? projects.length : projects.filter(p => p.category === category.id).length})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Card hover gradient className="h-full flex flex-col">
                  <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <AnimatePresence>
                      {hoveredProject === project.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4"
                        >
                          <div className="flex gap-2">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-white/30 transition-colors"
                              >
                                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                Live
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-white/30 transition-colors"
                              >
                                <CodeBracketIcon className="w-4 h-4" />
                                Code
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm rounded-full text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    {project.stats && (
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {project.stats.users && (
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {project.stats.users}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Utilisateurs</p>
                          </div>
                        )}
                        {project.stats.conversion && (
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                              {project.stats.conversion}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Conversion</p>
                          </div>
                        )}
                        {project.stats.performance && (
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              {project.stats.performance}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Performance</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
