'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Project data avec les vrais projets de Shay Acoca
const projectsData = [
  {
    id: 1,
    title: 'Futurist Cards',
    description: 'Plateforme moderne de cartes de visite digitales avec design futuriste et animations avancées.',
    image: '/images/projects/futurist-cards.jpg',
    category: 'webapp',
    technologies: ['React', 'Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    liveUrl: 'https://futurist-cards.vercel.app',
    githubUrl: 'https://github.com/shayacoca/futurist-cards',
    featured: true,
    status: 'completed'
  },
  {
    id: 2,
    title: 'BiCards',
    description: 'Solution innovante de cartes de visite interactives avec intégration sociale et partage simplifié.',
    image: '/images/projects/bicards.jpg',
    category: 'mobileapp',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io'],
    liveUrl: 'https://bicards.app',
    githubUrl: 'https://github.com/shayacoca/bicards',
    featured: true,
    status: 'completed'
  },
  {
    id: 3,
    title: 'Site Vitrine Pro',
    description: 'Template de site vitrine professionnel avec CMS intégré et optimisation SEO avancée.',
    image: '/images/projects/site-vitrine.jpg',
    category: 'website',
    technologies: ['WordPress', 'PHP', 'MySQL', 'CSS3', 'JavaScript'],
    liveUrl: 'https://site-vitrine-pro.com',
    githubUrl: 'https://github.com/shayacoca/site-vitrine-pro',
    featured: false,
    status: 'completed'
  },
  {
    id: 4,
    title: 'E-commerce Platform',
    description: 'Plateforme e-commerce complète avec gestion des stocks, paiements et analytics en temps réel.',
    image: '/images/projects/ecommerce.jpg',
    category: 'e-commerce',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis', 'Docker'],
    liveUrl: null,
    githubUrl: 'https://github.com/shayacoca/ecommerce-platform',
    featured: false,
    status: 'in_progress'
  }
];

// Icon Components
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    document.title = 'Projets - Shay Acoca | Portfolio Digital Marketing & Développement';
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = selectedCategory === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);

  const categories = [
    { key: 'all', label: 'Tous les projets' },
    { key: 'webapp', label: 'Web Apps' },
    { key: 'mobileapp', label: 'Mobile Apps' },
    { key: 'website', label: 'Sites Web' },
    { key: 'e-commerce', label: 'E-commerce' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#3C3C66] to-[#0a0a23] flex items-center justify-center">
        <motion.div 
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 border-2 border-[#00FFAA]/30 border-t-[#00FFAA] rounded-full"></div>
          <div className="absolute inset-0 w-16 h-16 border-2 border-[#888EF0]/20 border-b-[#888EF0] rounded-full animate-ping"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#3C3C66] to-[#0a0a23] relative overflow-hidden">
      {/* Matrix Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00FFAA] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#888EF0] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse [animation-delay:2s]"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#3C3C66] rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse [animation-delay:4s]"></div>
      </div>

      <div className="relative z-10 container-custom section-spacing">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 data-testid="projects-title" className="text-4xl md:text-6xl font-bold matrix-text-animated mb-6 font-secondary">
            Mes Projets
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Une collection de projets futuristes combinant technologies avancées, 
            design immersif et expériences utilisateur exceptionnelles.
          </motion.p>

          {/* Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category.key;
              return (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  data-testid="filter-tab"
                  aria-label={`Filtrer par ${category.label}`}
                  aria-pressed={isSelected ? "true" : "false"}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#00FFAA] to-[#888EF0] text-[#0a0a23] shadow-matrix'
                      : 'glass-card text-white/70 hover:text-[#00FFAA] hover:bg-white/5'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          data-testid="projects-grid"
        >
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-[#3C3C66] to-[#888EF0] rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <p className="text-white/70 text-xl mb-4">
                Aucun projet trouvé pour ce filtre
              </p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-[#00FFAA] hover:text-white transition-colors"
              >
                Voir tous les projets
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-testid="projects-container">
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                  data-testid="project-card"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3C3C66]/20 to-[#00FFAA]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                  
                  {/* Card */}
                  <div className="relative glass-card rounded-3xl overflow-hidden group-hover:scale-[1.02] transition-all duration-500">
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00FFAA] to-[#888EF0] text-black text-xs font-bold px-3 py-1 rounded-full">
                          ⭐ FEATURED
                        </span>
                      </div>
                    )}

                    {/* Project Image */}
                    <div className="aspect-video bg-gradient-to-br from-[#3C3C66]/20 to-[#888EF0]/20 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a23] to-[#3C3C66] opacity-50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl opacity-30">
                          {project.category === 'webapp' && '🌐'}
                          {project.category === 'mobileapp' && '📱'}
                          {project.category === 'website' && '💻'}
                          {project.category === 'e-commerce' && '🛒'}
                        </div>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00FFAA] transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-white/80 leading-relaxed mb-6 text-lg">
                            {project.description}
                          </p>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-[#00FFAA]/20 rounded-full text-sm text-white/90 hover:bg-[#00FFAA]/10 hover:border-[#00FFAA]/40 transition-all duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <Link
                          href={project.liveUrl || '#'}
                          className="inline-flex items-center gap-2 text-white/90 hover:text-[#00FFAA] font-semibold transition-colors group"
                        >
                          Voir le projet
                          <ChevronRightIcon />
                        </Link>

                        <div className="flex gap-3">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 text-white/70 hover:text-[#00FFAA] transition-all duration-300 glass-card hover:bg-[#00FFAA]/10 hover:border-[#00FFAA]/20 rounded-xl group"
                              aria-label={`Voir le site live de ${project.title}`}
                              title="Voir le site live"
                            >
                              <ExternalLinkIcon />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 text-white/70 hover:text-[#888EF0] transition-all duration-300 glass-card hover:bg-[#888EF0]/10 hover:border-[#888EF0]/20 rounded-xl group"
                              aria-label={`Voir le code source de ${project.title}`}
                              title="Code source"
                            >
                              <GithubIcon />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20"
        >
          <div className="glass-card p-12 rounded-3xl">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-[#00FFAA] bg-clip-text text-transparent mb-6">
              Prêt à créer quelque chose d'extraordinaire ?
            </h3>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Discutons de votre prochain projet et transformons vos idées en réalité digitale immersive.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3C3C66] to-[#00FFAA] text-white font-bold rounded-2xl shadow-2xl shadow-[#00FFAA]/25 hover:shadow-[#00FFAA]/40 transition-all duration-300 hover:scale-105"
            >
              Démarrer un projet
              <ChevronRightIcon />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
