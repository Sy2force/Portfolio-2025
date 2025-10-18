'use client';

import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ProjectsRealShowcase from '../../components/sections/ProjectsRealShowcase';

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ProjectsRealShowcase />
      </main>
      <Footer />
    </>
  );
}
