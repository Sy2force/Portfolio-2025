'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../ui/ProjectCard';

const projects = [
  {
    title: 'Arrow Agency',
    description: 'Site web moderne pour agence de marketing digital avec animations fluides, design responsive et système de gestion de contenu intégré.',
    image: '/images/projects/arrow-agency.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Strapi'],
    liveUrl: 'https://arrow-agency.vercel.app',
    githubUrl: 'https://github.com/shayacoca/arrow-agency',
    category: 'UI/UX Design',
    featured: true
  },
  {
    title: 'JetsetPack',
    description: 'Plateforme e-commerce complète pour accessoires de voyage avec paiement sécurisé, gestion des stocks et analytics avancés.',
    image: '/images/projects/jetsetpack.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    liveUrl: 'https://jetsetpack.com',
    githubUrl: 'https://github.com/shayacoca/jetsetpack',
    category: 'E-commerce',
    featured: true
  },
  {
    title: '1948 Agency',
    description: 'Stratégie de contenu et design pour agence créative, incluant identité visuelle, site web et campagnes marketing.',
    image: '/images/projects/1948-agency.jpg',
    technologies: ['Figma', 'Adobe Suite', 'WordPress', 'Google Analytics'],
    liveUrl: 'https://1948agency.com',
    category: 'Branding'
  },
  {
    title: 'Koogoo Box',
    description: 'Campagnes publicitaires créatives et branding complet pour startup tech, avec ROI de +300% sur 6 mois.',
    image: '/images/projects/koogoo-box.jpg',
    technologies: ['Meta Ads', 'Google Ads', 'Canva', 'Analytics'],
    liveUrl: 'https://koogoobox.com',
    category: 'Marketing Digital'
  },
  {
    title: 'FuturistCards',
    description: 'Application React pour cartes de visite digitales avec QR codes, analytics et partage social intégré.',
    image: '/images/projects/futurist-cards.jpg',
    technologies: ['React', 'Firebase', 'QR.js', 'PWA'],
    liveUrl: 'https://futuristcards.app',
    githubUrl: 'https://github.com/shayacoca/futurist-cards',
    category: 'App Mobile'
  },
  {
    title: 'Portfolio 2025',
    description: 'Portfolio full-stack moderne avec design Matrix, glassmorphism, animations avancées et backend Node.js.',
    image: '/images/projects/portfolio-2025.jpg',
    technologies: ['Next.js 14', 'TypeScript', 'Express', 'MongoDB', 'Framer Motion'],
    liveUrl: 'https://portfolio-shay-acoca.vercel.app',
    githubUrl: 'https://github.com/shayacoca/portfolio-2025',
    category: 'Full-Stack'
  }
];

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="matrix-text font-matrix">Mes Réalisations</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto"
          >
            Une sélection de projets qui démontrent mon expertise en développement full-stack, 
            design UI/UX et marketing digital.
          </motion.p>
        </motion.div>

        {/* Services Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              icon: '💻',
              title: 'Développement Web Full-Stack',
              description: '15+ projets',
              stats: 'React, Next.js, Node.js, MongoDB'
            },
            {
              icon: '📈',
              title: 'Marketing Digital & Growth',
              description: '+300% ROI',
              stats: 'Meta Ads, Google Ads, Analytics'
            },
            {
              icon: '🎨',
              title: 'UI/UX Design & Branding',
              description: '50+ designs',
              stats: 'Figma, Adobe Suite, Prototyping'
            }
          ].map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 text-center"
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
              <div className="text-matrix-primary font-medium mb-2">{service.description}</div>
              <p className="text-sm text-white/60">{service.stats}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Prêt à créer quelque chose d'extraordinaire ?
            </h3>
            <p className="text-white/70 mb-6">
              Discutons de votre projet et transformons vos idées en réalité digitale.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button text-lg px-8 py-4"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              🚀 Démarrer un projet
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
