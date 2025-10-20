'use client';

import React, { useEffect, useState } from 'react';
import Hero from '../components/sections/Hero';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import CTASection from '../components/ui/CTASection';

export default function HomeClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToContact = () => {
    if (mounted && typeof window !== 'undefined') {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    if (mounted && typeof window !== 'undefined') {
      const projectsSection = document.getElementById('projects');
      projectsSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-matrix-primary">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Projects Section */}
      <FeaturedProjects />
      
      {/* CTA Section */}
      <CTASection
        title="Transformons vos idées en réalité digitale"
        description="Que vous ayez besoin d'un site web moderne, d'une stratégie marketing performante ou d'une application sur mesure, je suis là pour vous accompagner dans votre transformation digitale."
        primaryButton={{
          text: "🚀 Démarrer un projet",
          onClick: scrollToContact
        }}
        secondaryButton={{
          text: "📋 Voir tous mes projets",
          onClick: scrollToProjects
        }}
        variant="centered"
        className="bg-gradient-to-b from-transparent to-matrix-dark/50"
      />
    </>
  );
}
