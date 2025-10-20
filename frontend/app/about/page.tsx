'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'À propos - Shay Acoca | Digital Marketer & Full-Stack Developer';
  }, []);

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
          <h1 data-testid="about-title" className="text-4xl md:text-6xl font-bold matrix-text-animated mb-6 font-secondary">À Propos</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Digital Marketer & Full-Stack Developer basé à Jérusalem, je transforme les idées en solutions digitales performantes.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20" data-testid="about-content">
          {/* Story & Mission */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold matrix-text mb-6 font-secondary">Mon Parcours</h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Passionné par l'innovation digitale, j'ai débuté ma carrière dans le marketing digital chez 
                  <span className="text-[#00FFAA] font-semibold"> Bezeq</span> (2022-2024) où j'ai développé 
                  une expertise approfondie en stratégie multi-canaux et analytics.
                </p>
                <p>
                  Aujourd'hui, je me spécialise dans le développement Full-Stack avec une formation intensive 
                  chez <span className="text-[#888EF0] font-semibold">HackerU</span> (400h), maîtrisant les 
                  technologies modernes comme React, Next.js, Node.js et MongoDB.
                </p>
                <p>
                  Cette double expertise marketing/tech me permet de créer des solutions complètes qui allient 
                  performance technique et impact business mesurable.
                </p>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold matrix-text mb-4 font-secondary">Ma Mission</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Transformer les visions entrepreneuriales en réalités digitales performantes. Je crois en la 
                puissance de la technologie au service des objectifs business concrets.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Innovation', 'Performance', 'ROI', 'User Experience'].map((value) => (
                  <span key={value} className="glass-card px-3 py-1 text-sm text-[#00FFAA] font-medium">
                    {value}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline & Skills */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8"
          >
            {/* Experience Timeline */}
            <div className="glass-card p-8" data-testid="experience-section">
              <h3 className="text-2xl font-bold matrix-text mb-6 font-secondary">Timeline</h3>
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-2 w-4 h-4 bg-[#00FFAA] rounded-full border-4 border-[#0a0a23]"></div>
                  <div className="absolute left-2 top-6 w-0.5 h-16 bg-[#00FFAA]/30"></div>
                  <div className="mb-1">
                    <span className="text-sm text-[#888EF0] font-medium">2024 - Présent</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Full-Stack Developer Freelance</h4>
                  <p className="text-white/60 text-sm">Développement d'applications web • React, Next.js, Node.js, MongoDB</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-2 w-4 h-4 bg-[#888EF0] rounded-full border-4 border-[#0a0a23]"></div>
                  <div className="absolute left-2 top-6 w-0.5 h-16 bg-[#888EF0]/30"></div>
                  <div className="mb-1">
                    <span className="text-sm text-[#888EF0] font-medium">2022 - 2024</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Digital Marketing Specialist • Bezeq</h4>
                  <p className="text-white/60 text-sm">Stratégie digitale • Campagnes ROI • Meta Business • Analytics</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute left-0 top-2 w-4 h-4 bg-[#3C3C66] rounded-full border-4 border-[#0a0a23]"></div>
                  <div className="mb-1">
                    <span className="text-sm text-[#3C3C66] font-medium">2024</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Formation HackerU (400h)</h4>
                  <p className="text-white/60 text-sm">Full-Stack Development • Certifications • Projets pratiques</p>
                </motion.div>
              </div>
            </div>

            {/* Certifications */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold matrix-text mb-6 font-secondary">Certifications</h3>
              <div className="space-y-3">
                {[
                  'Meta Blueprint Certified',
                  'Wix Expert Partner',
                  'Figma UI/UX Design',
                  'Google Analytics Certified'
                ].map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-[#00FFAA] rounded-full"></div>
                    <span className="text-white/80">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold matrix-text text-center mb-12 font-secondary" data-testid="skills-section">
            Stack Technique
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'], color: 'from-[#00FFAA]' },
              { category: 'Backend', skills: ['Node.js', 'Express', 'MongoDB', 'JWT'], color: 'from-[#888EF0]' },
              { category: 'Design', skills: ['Figma', 'Adobe Suite', 'UI/UX', 'Responsive'], color: 'from-[#3C3C66]' },
              { category: 'Marketing', skills: ['Meta Business', 'Analytics', 'SEO', 'WordPress'], color: 'from-[#00FFAA]' },
            ].map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="glass-card p-6 hover:scale-105 transition-transform"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} to-transparent rounded-lg mb-4 flex items-center justify-center`}>
                  <span className="text-2xl">🔧</span>
                </div>
                <h4 className="text-lg font-bold matrix-text mb-3 font-secondary">{category.category}</h4>
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div key={skill} className="text-white/70 text-sm" data-testid="skill-item">{skill}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20"
        >
          {[
            { number: '3+', label: 'Années expérience', desc: 'Marketing & Tech' },
            { number: '50+', label: 'Clients satisfaits', desc: 'Projets réussis' },
            { number: '30+', label: 'Projets réalisés', desc: 'Web & Mobile' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="glass-card p-8 text-center hover:scale-105 transition-transform"
            >
              <div className="text-4xl md:text-5xl font-bold matrix-text mb-2 font-secondary">
                {stat.number}
              </div>
              <div className="text-white font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-white/60 text-sm">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 font-secondary">
              Collaborons ensemble !
            </h3>
            <p className="text-white/70 mb-6">
              Prêt à transformer votre vision en réalité digitale ? Discutons de votre projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/projects" variant="glass" size="lg">
                Voir mes projets
              </Button>
              <Button href="/contact" variant="primary" size="lg">
                Me contacter
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
