'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectsMinimal() {
  const projects = [
    {
      id: 1,
      title: 'Expert Création de Contenu',
      year: '2021-2024',
      status: 'Terminé'
    },
    {
      id: 2,
      title: 'Formation Marketing Digital',
      year: '2024',
      status: 'Terminé'
    },
    {
      id: 3,
      title: 'Plateforme Portfolios',
      year: '2024',
      status: 'En cours'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Projets Sélectionnés
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm text-blue-600 font-medium">{project.year}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  project.status === 'Terminé' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900">
                {project.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
