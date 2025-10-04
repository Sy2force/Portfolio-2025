import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlus } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

const ProjectsEditor = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-dark-secondary/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <div className="text-center py-12">
          <HiPlus className="w-16 h-16 text-neon-pink mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            Gestion des Projets
          </h3>
          <p className="text-gray-400 mb-6">
            Utilisez la page admin/projects existante pour gérer vos projets
          </p>
          <a
            href="/admin/projects"
            className="inline-block px-6 py-3 bg-gradient-to-r from-neon-pink to-neon-purple rounded-xl text-white font-medium"
          >
            Aller à la gestion des projets
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectsEditor;
