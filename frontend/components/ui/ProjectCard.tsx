'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  image,
  liveUrl,
  githubUrl,
  category,
  featured = false
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`group glass-card overflow-hidden ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-video">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-matrix-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="glass-card px-3 py-1 text-xs font-medium text-matrix-primary">
            {category}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="glass-card p-2 hover:bg-matrix-primary hover:text-matrix-dark transition-colors duration-200"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </motion.a>
          )}
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="glass-card p-2 hover:bg-matrix-primary hover:text-matrix-dark transition-colors duration-200"
            >
              <CodeBracketIcon className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-matrix-primary transition-colors duration-200">
          {title}
        </h3>
        
        <p className="text-white/70 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-white/80"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-matrix-primary">
              +{technologies.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-matrix-primary hover:text-matrix-secondary transition-colors duration-200"
              >
                Voir le projet
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                Code source
              </a>
            )}
          </div>
          
          {featured && (
            <span className="text-xs text-matrix-accent font-medium">
              ⭐ Projet phare
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
