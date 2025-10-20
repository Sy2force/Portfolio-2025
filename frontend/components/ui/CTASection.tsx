'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    onClick: () => void;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
  variant?: 'default' | 'centered' | 'split';
  className?: string;
}

export default function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  variant = 'default',
  className = ''
}: CTASectionProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (variant === 'split') {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className={`py-20 px-6 ${className}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-12 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold matrix-text mb-6">
                {title}
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                {description}
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 lg:justify-end"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={primaryButton.onClick}
                className="glass-button text-lg px-8 py-4"
              >
                {primaryButton.text}
              </motion.button>
              
              {secondaryButton && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={secondaryButton.onClick}
                  className="glass-button-outline text-lg px-8 py-4"
                >
                  {secondaryButton.text}
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>
    );
  }

  if (variant === 'centered') {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className={`py-20 px-6 ${className}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold matrix-text mb-6"
            >
              {title}
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-white/70 mb-8 leading-relaxed"
            >
              {description}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={primaryButton.onClick}
                className="glass-button text-lg px-8 py-4"
              >
                {primaryButton.text}
              </motion.button>
              
              {secondaryButton && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={secondaryButton.onClick}
                  className="glass-button-outline text-lg px-8 py-4"
                >
                  {secondaryButton.text}
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>
    );
  }

  // Default variant
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className={`py-20 px-6 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-12">
          <div className="max-w-3xl">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold matrix-text mb-6"
            >
              {title}
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-white/70 mb-8 leading-relaxed"
            >
              {description}
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={primaryButton.onClick}
                className="glass-button text-lg px-8 py-4"
              >
                {primaryButton.text}
              </motion.button>
              
              {secondaryButton && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={secondaryButton.onClick}
                  className="glass-button-outline text-lg px-8 py-4"
                >
                  {secondaryButton.text}
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
