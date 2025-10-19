'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import { useTranslation } from '@/lib/hooks/useTranslation';

export default function HeroSection() {
  const { t } = useTranslation();

  const scrollToSection = () => {
    const element = document.getElementById('projects');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: `radial-gradient(circle, ${
                  ['#3B82F6', '#8B5CF6', '#EC4899'][i]
                } 0%, transparent 70%)`,
                width: `${300 + i * 100}px`,
                height: `${300 + i * 100}px`,
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 mb-8 shadow-lg"
          >
            <SparklesIcon className="w-4 h-4 text-yellow-500" />
            {t('hero.available')}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-4"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
          >
            {t('hero.description')}
          </motion.p>

          {/* Location */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 dark:text-gray-400 mb-12"
          >
            {t('hero.location')}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {Object.entries(t('hero.stats')).map(([key, value], index) => (
              <div
                key={key}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
              >
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1, type: "spring" }}
                  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  {value.split(' ')[0]}
                </motion.p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {value.split(' ').slice(1).join(' ')}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="shadow-xl"
            >
              {t('hero.cta.contact')}
            </Button>
            <Button
              href="/projects"
              variant="outline"
              size="lg"
            >
              {t('hero.cta.projects')}
            </Button>
            <Button
              href="/cv/shay-acoca-cv-fr.pdf"
              variant="secondary"
              size="lg"
            >
              {t('hero.cta.cv')}
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex gap-4 justify-center"
          >
            <a
              href="https://github.com/shayacoca"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </a>
            <a
              href="https://linkedin.com/in/shayacoca"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-6 h-6 text-blue-600" />
            </a>
            <a
              href="mailto:shayacoca20@gmail.com"
              className="p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
              aria-label="Send Email"
            >
              <FaEnvelope className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={scrollToSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg"
            >
              <ArrowDownIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
