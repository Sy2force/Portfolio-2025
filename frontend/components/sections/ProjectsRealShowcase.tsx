'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeBracketIcon, EyeIcon, StarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { RealProject, ProjectCategory } from '../../lib/types/real-projects';

const ProjectsRealShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Projets réels de Shay Acoca
  const realProjects: RealProject[] = [
    {
      id: 1,
      title: "FaceWork - Plateforme de cartes de visite numériques",
      description: "Plateforme SaaS complète pour cartes de visite numériques avec 150+ clients actifs et 500+ cartes créées.",
      category: "saas",
      tech: ["React", "Next.js", "TypeScript", "MongoDB", "Stripe"],
      color: "from-blue-600 to-purple-600",
      stats: { clients: "150+", cards: "500+", conversion: "15%" },
      github: "https://github.com/Sy2force/BCARD",
      live: "https://futuristcards.netlify.app",
      image: "/images/Design sans titre/card saas.jpg",
      featured: true
    },
    {
      id: 2,
      title: "E-Commerce Électrique",
      description: "Boutique e-commerce complète avec 1,200+ produits, gestion inventaire temps réel et 500+ commandes traitées.",
      category: "ecommerce",
      tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      color: "from-green-600 to-teal-600",
      stats: { products: "1,200+", orders: "500+", conversion: "3.2%" },
      github: "https://github.com/shayacoca/E-commerce",
      live: "https://e-commerce-shay.netlify.app",
      image: "/images/Design sans titre/e-commerce.jpg",
      featured: true
    },
    {
      id: 3,
      title: "Site Vitrine Services",
      description: "Site vitrine optimisé avec score PageSpeed 98/100, taux de conversion 18% et 200+ réservations générées.",
      category: "web",
      tech: ["React", "Tailwind CSS", "Framer Motion", "SEO"],
      color: "from-orange-600 to-red-600",
      stats: { pagespeed: "98/100", conversion: "18%", bookings: "200+" },
      github: "https://github.com/shayacoca/Site-vitrine",
      live: "https://site-vitrine-shay.netlify.app",
      image: "/images/Design sans titre/site vitrine.jpg",
      featured: false
    },
    {
      id: 4,
      title: "FaceWork (BCARD)",
      description: "Application PWA innovante pour cartes digitales avec design glassmorphisme et fonctionnalités avancées.",
      category: "pwa",
      tech: ["React", "PWA", "MongoDB", "JWT"],
      color: "from-pink-600 to-rose-600",
      stats: { users: "100+", rating: "4.8/5", features: "15+" },
      github: "https://github.com/shayacoca/FaceWork",
      live: "https://facework-bcard.netlify.app",
      image: "/images/Design sans titre/bcard.jpg",
      featured: true
    },
    {
      id: 5,
      title: "Marketing Dashboard",
      description: "Tableau de bord analytics pour campagnes marketing avec métriques temps réel et rapports automatisés.",
      category: "analytics",
      tech: ["React", "D3.js", "Node.js", "Chart.js"],
      color: "from-indigo-600 to-blue-600",
      stats: { campaigns: "50+", metrics: "20+", accuracy: "95%" },
      github: "https://github.com/shayacoca/Marketing-Dashboard",
      live: "https://marketing-dashboard-shay.netlify.app",
      image: "/images/Design sans titre/marketing dashboard.jpg",
      featured: false
    },
    {
      id: 6,
      title: "Portfolio Full-Stack 2025",
      description: "Portfolio personnel moderne avec architecture full-stack, multilingue FR/EN/HE et optimisations avancées.",
      category: "portfolio",
      tech: ["Next.js 14", "TypeScript", "Express", "MongoDB"],
      color: "from-purple-600 to-pink-600",
      stats: { languages: "3", performance: "A+", features: "25+" },
      github: "https://github.com/Sy2force/Portfolio-2025",
      live: "https://portfolio-shay.netlify.app",
      image: "/images/Design sans titre/Portfolio full stack .jpg",
      featured: true
    }
  ];

  const categories: ProjectCategory[] = [
    { id: 'all', label: 'Tous', icon: '', count: realProjects.length },
    { id: 'saas', label: 'SaaS', icon: '', count: realProjects.filter(p => p.category === 'saas').length },
    { id: 'ecommerce', label: 'E-Commerce', icon: '', count: realProjects.filter(p => p.category === 'ecommerce').length },
    { id: 'web', label: 'Web', icon: '', count: realProjects.filter(p => p.category === 'web').length },
    { id: 'pwa', label: 'PWA', icon: '', count: realProjects.filter(p => p.category === 'pwa').length },
    { id: 'analytics', label: 'Analytics', icon: '', count: realProjects.filter(p => p.category === 'analytics').length },
    { id: 'portfolio', label: 'Portfolio', icon: '', count: realProjects.filter(p => p.category === 'portfolio').length }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? realProjects 
    : realProjects.filter(p => p.category === selectedCategory);


  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-neutral-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 hero-pattern" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-primary-600 text-sm font-medium mb-6"
          >
            <StarIcon className="w-4 h-4" />
            Projets Clients Réels
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Mes Réalisations Professionnelles
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            Découvrez mes projets clients avec des résultats concrets : 
            <span className="font-semibold text-primary-600"> 150+ clients actifs</span>, 
            <span className="font-semibold text-primary-600"> 500+ cartes créées</span>, et 
            <span className="font-semibold text-primary-600"> 1,200+ produits</span> gérés.
          </p>
          
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">6</div>
              <div className="text-sm text-neutral-600">Projets Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">150+</div>
              <div className="text-sm text-neutral-600">Clients Actifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">98/100</div>
              <div className="text-sm text-neutral-600">PageSpeed Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">18%</div>
              <div className="text-sm text-neutral-600">Taux Conversion</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-neutral-700 hover:bg-primary-50 hover:text-primary-600 shadow-md'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label} ({category.count})
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-neutral-100">
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <StarIcon className="w-3 h-3" />
                        Featured
                      </div>
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-50">
                    {/* Real Project Image */}
                    <div className="absolute inset-0">
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Hover overlay with actions - only appears on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        scale: hoveredProject === project.id ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="text-white text-center">
                        <div className="flex justify-center gap-3">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors border border-white/20 flex items-center gap-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(project.github, '_blank');
                            }}
                          >
                            <CodeBracketIcon className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-medium">Code</span>
                          </motion.a>
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors border border-white/20 flex items-center gap-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(project.live, '_blank');
                            }}
                          >
                            <EyeIcon className="w-5 h-5 text-white" />
                            <span className="text-white text-sm font-medium">Demo</span>
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-neutral-600 mb-4 text-sm line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-sm font-bold text-primary-600">{value}</div>
                          <div className="text-xs text-neutral-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                          className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-md"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 bg-neutral-100 text-neutral-500 text-xs rounded-md">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Mini CTA Buttons */}
                    <div className="flex gap-2">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-neutral-900 text-white text-xs font-medium rounded-lg hover:bg-neutral-800 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <CodeBracketIcon className="w-4 h-4" />
                        GitHub
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <EyeIcon className="w-4 h-4" />
                        Demo
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/projects">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir tous mes projets clients
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsRealShowcase;
