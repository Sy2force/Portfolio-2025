'use client';

import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import AboutTimeline from '../../components/sections/AboutTimeline';
import { motion } from 'framer-motion';

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
        >
          Expert Marketing Digital, Créateur de Contenu et Développeur Full-Stack
          combinant créativité, design et technologie pour des résultats concrets.
        </motion.p>
        <AboutTimeline />
      </main>
      <Footer />
    </>
  );
}
