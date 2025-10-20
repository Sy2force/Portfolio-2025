'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Custom Icons
const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export default function CVPage() {
  const handleDownloadCV = (language: 'fr' | 'en') => {
    const fileName = language === 'fr' ? 'shay-acoca-cv-fr.pdf' : 'shay-acoca-resume-en.pdf';
    const link = document.createElement('a');
    link.href = `/cv/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#3C3C66] to-[#0a0a23] relative overflow-hidden">
      {/* Matrix Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00FFAA] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#888EF0] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse [animation-delay:2s]"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#3C3C66] rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse [animation-delay:4s]"></div>
      </div>

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 data-testid="cv-title" className="text-5xl md:text-6xl font-bold matrix-text font-matrix mb-8">
              Mon CV
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Développeur Full-Stack & Expert Marketing Digital passionné par l'innovation technologique
            </motion.p>

            {/* Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <button
                onClick={() => handleDownloadCV('fr')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3C3C66] to-[#00FFAA] text-white font-bold rounded-2xl shadow-2xl shadow-[#00FFAA]/25 hover:shadow-[#00FFAA]/40 transition-all duration-300 hover:scale-105"
              >
                <DownloadIcon />
                Télécharger CV (Français)
              </button>
              
              <button
                onClick={() => handleDownloadCV('en')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#888EF0] to-[#3C3C66] text-white font-bold rounded-2xl shadow-2xl shadow-[#888EF0]/25 hover:shadow-[#888EF0]/40 transition-all duration-300 hover:scale-105"
              >
                <DownloadIcon />
                Download Resume (English)
              </button>
            </motion.div>
          </motion.div>

          {/* CV Content */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Personal Info & Contact */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Profile */}
              <div className="glass-card p-8">
                <div className="text-center mb-8">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#3C3C66] to-[#00FFAA] rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                    <span className="text-white font-bold text-4xl">SA</span>
                  </div>
                  <h2 className="text-2xl font-bold matrix-text mb-2">Shay Acoca</h2>
                  <p className="text-white/70 text-lg">Full-Stack Developer & Marketing Expert</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/80">
                    <MapPinIcon />
                    <span>Jérusalem, Israël</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <CalendarIcon />
                    <span>25 ans</span>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold matrix-text mb-6">Langues</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Français</span>
                    <span className="text-matrix-primary font-semibold">Natif</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Hébreu</span>
                    <span className="text-matrix-secondary font-semibold">Courant</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Anglais</span>
                    <span className="text-matrix-accent font-semibold">Intermédiaire</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold matrix-text mb-6">Compétences Techniques</h3>
                <div className="space-y-3">
                  {[
                    'React & Next.js',
                    'Node.js & Express',
                    'TypeScript',
                    'MongoDB & PostgreSQL',
                    'Tailwind CSS',
                    'Framer Motion',
                    'Docker & AWS',
                    'Git & GitHub'
                  ].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white/90"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Experience & Education */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Experience */}
              <div className="glass-card p-8">
                <h3 className="text-3xl font-bold matrix-text mb-8">Expérience Professionnelle</h3>
                <div className="space-y-8">
                  <div className="border-l-2 border-matrix-primary pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h4 className="text-xl font-bold text-white">Formation Full-Stack Developer</h4>
                      <span className="text-matrix-primary font-semibold">2024 - Présent</span>
                    </div>
                    <p className="text-white/60 mb-2">HackerU - Formation intensive 400h</p>
                    <p className="text-white/80 leading-relaxed">
                      Formation intensive en développement full-stack couvrant React, Node.js, MongoDB, 
                      et les meilleures pratiques du développement moderne.
                    </p>
                  </div>

                  <div className="border-l-2 border-matrix-secondary pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h4 className="text-xl font-bold text-white">Marketing Digital Specialist</h4>
                      <span className="text-matrix-secondary font-semibold">2022 - 2024</span>
                    </div>
                    <p className="text-white/60 mb-2">Bezeq - Plus grande compagnie télécom d'Israël</p>
                    <p className="text-white/80 leading-relaxed">
                      Gestion de campagnes publicitaires digitales, optimisation SEO/SEM, 
                      analyse de données et amélioration des taux de conversion.
                    </p>
                  </div>

                  <div className="border-l-2 border-matrix-accent pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h4 className="text-xl font-bold text-white">Freelance Marketing & Design</h4>
                      <span className="text-matrix-accent font-semibold">2020 - Présent</span>
                    </div>
                    <p className="text-white/60 mb-2">Indépendant - 50+ clients accompagnés</p>
                    <p className="text-white/80 leading-relaxed">
                      Création de sites web, campagnes publicitaires Meta/Google Ads, 
                      branding et stratégies de croissance digitale.
                    </p>
                  </div>

                  <div className="border-l-2 border-white/30 pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h4 className="text-xl font-bold text-white">Service Militaire - Tsahal</h4>
                      <span className="text-white/70 font-semibold">2019 - 2022</span>
                    </div>
                    <p className="text-white/60 mb-2">Forces de Défense d'Israël</p>
                    <p className="text-white/80 leading-relaxed">
                      Service militaire obligatoire avec développement de compétences en leadership, 
                      travail d'équipe et gestion sous pression.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="glass-card p-8">
                <h3 className="text-3xl font-bold matrix-text mb-8">Formation</h3>
                <div className="space-y-6">
                  <div className="border-l-2 border-matrix-primary pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h4 className="text-xl font-bold text-white">Développement Full-Stack</h4>
                      <span className="text-matrix-primary font-semibold">2024</span>
                    </div>
                    <p className="text-white/60 mb-2">HackerU - Certification professionnelle</p>
                    <p className="text-white/80">
                      React, Node.js, MongoDB, TypeScript, AWS, Docker
                    </p>
                  </div>

                  <div className="border-l-2 border-matrix-secondary pl-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h4 className="text-xl font-bold text-white">Marketing Digital</h4>
                      <span className="text-matrix-secondary font-semibold">2020-2022</span>
                    </div>
                    <p className="text-white/60 mb-2">Certifications Google & Meta</p>
                    <p className="text-white/80">
                      Google Ads, Meta Business, Analytics, SEO/SEM
                    </p>
                  </div>
                </div>
              </div>

              {/* Projects Highlights */}
              <div className="glass-card p-8">
                <h3 className="text-3xl font-bold matrix-text mb-8">Projets Marquants</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-3">Portfolio Matrix 2025</h4>
                    <p className="text-white/70 text-sm mb-4">
                      Portfolio personnel avec design futuriste, animations avancées et architecture moderne.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-matrix-primary/20 text-matrix-primary px-2 py-1 rounded">Next.js</span>
                      <span className="text-xs bg-matrix-secondary/20 text-matrix-secondary px-2 py-1 rounded">TypeScript</span>
                      <span className="text-xs bg-matrix-accent/20 text-matrix-accent px-2 py-1 rounded">Framer Motion</span>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-3">E-Commerce Platform</h4>
                    <p className="text-white/70 text-sm mb-4">
                      Plateforme e-commerce complète avec paiements Stripe et dashboard analytics.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-matrix-primary/20 text-matrix-primary px-2 py-1 rounded">React</span>
                      <span className="text-xs bg-matrix-secondary/20 text-matrix-secondary px-2 py-1 rounded">Node.js</span>
                      <span className="text-xs bg-matrix-accent/20 text-matrix-accent px-2 py-1 rounded">MongoDB</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="glass-card p-12 rounded-3xl">
              <h3 className="text-3xl font-bold matrix-text mb-6">
                Intéressé par mon profil ?
              </h3>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Contactez-moi pour discuter d'opportunités de collaboration ou d'emploi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3C3C66] to-[#00FFAA] text-white font-bold rounded-2xl shadow-2xl shadow-[#00FFAA]/25 hover:shadow-[#00FFAA]/40 transition-all duration-300 hover:scale-105"
                >
                  Me contacter
                  <ExternalLinkIcon />
                </Link>
                <a
                  href="https://linkedin.com/in/shayacoca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#888EF0] to-[#3C3C66] text-white font-bold rounded-2xl shadow-2xl shadow-[#888EF0]/25 hover:shadow-[#888EF0]/40 transition-all duration-300 hover:scale-105"
                >
                  LinkedIn
                  <ExternalLinkIcon />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
