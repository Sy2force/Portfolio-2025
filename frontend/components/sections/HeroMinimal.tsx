'use client';

import { motion } from 'framer-motion';

export default function HeroMinimal() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Shay Acoca
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
            Expert Création de Contenu • Développeur Full-Stack
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors">
              Projets
            </button>
            <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded font-medium hover:bg-blue-600 hover:text-white transition-colors">
              Contact
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
