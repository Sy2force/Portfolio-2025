'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="text-6xl"
              >
                🤷‍♂️
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-3xl font-bold text-gray-900 dark:text-white"
        >
          Page introuvable
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto"
        >
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/" variant="primary" size="lg">
            Retour à l'accueil
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Me contacter
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-sm text-gray-500 dark:text-gray-400"
        >
          <p>Vous pouvez aussi explorer:</p>
          <div className="mt-4 flex gap-6 justify-center">
            <Link href="/projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Projets
            </Link>
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              À propos
            </Link>
            <Link href="/services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Services
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
