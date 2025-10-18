'use client';

import { motion } from 'framer-motion';
import { ArrowDownIcon, CodeBracketIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import '../../styles/hero.css';

export default function HeroComplete() {
  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Cover Image - Photo Pure */}
      <div className="absolute inset-0">
        <div className="hero-background">
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-6">
            Shay Acoca
          </h1>
          <p className="text-xl md:text-2xl text-white drop-shadow-xl mb-8">
            Expert Création de Contenu • Développeur Full-Stack
          </p>
          <p className="text-lg text-white drop-shadow-lg mb-12 max-w-3xl mx-auto">
            3 ans d'expérience en marketing digital • 1+ an en développement full-stack
            <br />
            En perfectionnement chez HackerU jusqu'en 2026
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <motion.a
              href="https://github.com/Sy2force"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 group"
            >
              <CodeBracketIcon className="w-5 h-5" />
              Voir mon GitHub
            </motion.a>
            <motion.a
              href="/cv/CV de Shay Acoca copie.pdf"
              download="CV-Shay-Acoca.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 backdrop-blur-sm transition-colors flex items-center gap-3 justify-center"
            >
              <DocumentArrowDownIcon className="w-5 h-5" />
              Télécharger CV
            </motion.a>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-white drop-shadow-lg">3 ans</div>
              <div className="text-sm text-white drop-shadow-md">Marketing Digital</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white drop-shadow-lg">1+ an</div>
              <div className="text-sm text-white drop-shadow-md">Full-Stack</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white drop-shadow-lg">2024</div>
              <div className="text-sm text-white drop-shadow-md">Formation HackerU</div>
            </div>
          </div>
        </motion.div>
        

        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDownIcon className="w-6 h-6 text-gray-400 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
