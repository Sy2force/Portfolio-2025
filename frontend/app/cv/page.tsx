'use client';

import React from 'react';
import Navbar from '../../components/layout/Navbar';
import CVComplete from '../../components/ui/CVComplete';
import Footer from '../../components/layout/Footer';

export default function CVPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <CVComplete />
      </main>
      <Footer />
    </>
  );
}
