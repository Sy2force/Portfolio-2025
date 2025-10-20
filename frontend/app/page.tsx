'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

// Technology Icons
const TechIcon = ({ children, name }: { children: React.ReactNode; name: string }) => (
  <motion.div
    className="glass-card p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
    whileHover={{ y: -8 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="text-3xl">{children}</div>
    <span className="text-sm font-medium text-white/80">{name}</span>
  </motion.div>
);

const HomePage = () => {
  useEffect(() => {
    document.title = 'Shay Acoca - Digital Marketer & Full-Stack Developer';
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#3C3C66] to-[#0a0a23] relative overflow-hidden">
      {/* Matrix Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00FFAA] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#888EF0] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse [animation-delay:2s]"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#3C3C66] rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse [animation-delay:4s]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative container-custom section-spacing flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8"
        >
          <div className="w-2 h-2 bg-[#00FFAA] rounded-full animate-pulse" />
          <span className="text-sm font-medium text-white/90">Disponible immédiatement</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="matrix-text-animated font-secondary">Shay Acoca</span>
          <br />
          <span className="gradient-text">Digital Marketer</span>
          <br />
          <span className="text-white">&</span> <span className="gradient-text">Full-Stack Developer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl leading-relaxed"
        >
          Basé à <span className="text-[#00FFAA] font-semibold">Jérusalem</span>, je transforme les idées en solutions digitales performantes qui génèrent des résultats concrets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Button 
            href="/projects"
            variant="primary"
            size="lg"
            className="text-lg px-8 py-4"
          >
            Voir mes projets
          </Button>
          <Button 
            href="/contact"
            variant="glass"
            size="lg"
            className="text-lg px-8 py-4"
          >
            Me contacter
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-16"
        >
          {[
            { number: '3+', label: 'Années expérience' },
            { number: '50+', label: 'Clients satisfaits' },
            { number: '30+', label: 'Projets réalisés' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="glass-card p-4 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold matrix-text mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-white/60">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Technologies Section */}
      <section className="relative container-custom pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold matrix-text mb-4 font-secondary">
            Technologies Maîtrisées
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Stack technique moderne pour créer des applications web performantes et évolutives
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-4xl mx-auto"
        >
          <TechIcon name="React">⚛️</TechIcon>
          <TechIcon name="Next.js">▲</TechIcon>
          <TechIcon name="TypeScript">🔷</TechIcon>
          <TechIcon name="Node.js">🟢</TechIcon>
          <TechIcon name="MongoDB">🍃</TechIcon>
          <TechIcon name="Tailwind">🎨</TechIcon>
          <TechIcon name="Figma">🎯</TechIcon>
          <TechIcon name="WordPress">📝</TechIcon>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative container-custom pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-secondary">
            Prêt à créer quelque chose d'extraordinaire ?
          </h3>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Transformons ensemble votre vision en réalité digitale. De la conception à la mise en ligne, je vous accompagne à chaque étape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="/about"
              variant="secondary"
              size="lg"
            >
              En savoir plus
            </Button>
            <Button 
              href="/contact"
              variant="primary"
              size="lg"
            >
              Démarrer un projet
            </Button>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default HomePage;
