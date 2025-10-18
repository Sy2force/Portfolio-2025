'use client';

import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroComplete from '../components/sections/HeroComplete';
import ProjectsRealShowcase from '../components/sections/ProjectsRealShowcase';
import SkillsComplete from '../components/sections/SkillsComplete';
import ContactComplete from '../components/ui/ContactComplete';
import Footer from '../components/layout/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroComplete />
        <ProjectsRealShowcase />
        <SkillsComplete />
        <ContactComplete />
      </main>
      <Footer />
    </div>
  );
}
