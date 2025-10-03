import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaUpload, FaGithub, FaExternalLinkAlt, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface Project {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  images: string[];
  technologies: string[];
  category: string;
  github?: string;
  demo?: string;
  featured: boolean;
  year: number;
  status: 'completed' | 'in-progress' | 'planned';
  isPublished: boolean;
}

interface ProjectEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
  onSave: (project: Project) => void;
}

const ProjectEditModal = ({ isOpen, onClose, project, onSave }: ProjectEditModalProps) => {
  const [formData, setFormData] = useState<Project>({
    title: '',
    slug: '',
    description: '',
    longDescription: '',
    image: '',
    images: [],
    technologies: [],
    category: 'Web Development',
    github: '',
    demo: '',
    featured: false,
    year: new Date().getFullYear(),
    status: 'completed',
    isPublished: true,
  });

  const [newTech, setNewTech] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      setFormData(project);
      setImagePreview(project.image);
    } else {
      setFormData({
        title: '',
        slug: '',
        description: '',
        longDescription: '',
        image: '',
        images: [],
        technologies: [],
        category: 'Web Development',
        github: '',
        demo: '',
        featured: false,
        year: new Date().getFullYear(),
        status: 'completed',
        isPublished: true,
      });
      setImagePreview(null);
    }
  }, [project]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({ ...prev, image: data.url }));
        setImagePreview(data.url);
        toast.success('Image uploadée avec succès');
      }
    } catch (error) {
      toast.error('Erreur lors de l\'upload');
    }
  };

  const addTechnology = () => {
    if (newTech && !formData.technologies.includes(newTech)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech]
      }));
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-generate slug if empty
    if (!formData.slug && formData.title) {
      formData.slug = formData.title.toLowerCase().replace(/\s+/g, '-');
    }

    onSave(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-secondary/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 bg-dark-secondary/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {project ? 'Modifier le Projet' : 'Nouveau Projet'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Titre *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-all"
                      placeholder="Mon Super Projet"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-all"
                      placeholder="mon-super-projet"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description courte *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-all resize-none"
                    placeholder="Une brève description du projet..."
                  />
                </div>

                {/* Long Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description détaillée
                  </label>
                  <textarea
                    value={formData.longDescription}
                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-all resize-none"
                    placeholder="Description complète avec les détails techniques..."
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image principale
                  </label>
                  <div className="flex items-start space-x-4">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-20 object-cover rounded-lg border border-white/10"
                      />
                    )}
                    <label className="flex-1 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="flex items-center justify-center space-x-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-400 hover:text-white transition-all">
                        <FaUpload />
                        <span>Choisir une image</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Technologies
                  </label>
                  <div className="flex items-center space-x-2 mb-3">
                    <input
                      type="text"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-all"
                      placeholder="React, Node.js, etc."
                    />
                    <button
                      type="button"
                      onClick={addTechnology}
                      className="p-2 bg-neon-blue/20 hover:bg-neon-blue/30 rounded-lg text-neon-blue transition-all"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-full text-sm text-white flex items-center space-x-2"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => removeTechnology(tech)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <FaTimes size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <FaGithub className="inline mr-2" />
                      GitHub
                    </label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-all"
                      placeholder="https://github.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <FaExternalLinkAlt className="inline mr-2" />
                      Demo
                    </label>
                    <input
                      type="url"
                      value={formData.demo}
                      onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-all"
                      placeholder="https://demo.com"
                    />
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Catégorie
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
                    >
                      <option value="Web Development">Web Dev</option>
                      <option value="Mobile App">Mobile</option>
                      <option value="Design">Design</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Année
                    </label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Statut
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
                    >
                      <option value="completed">Terminé</option>
                      <option value="in-progress">En cours</option>
                      <option value="planned">Planifié</option>
                    </select>
                  </div>

                  <div className="flex items-end space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-5 h-5 bg-white/5 border border-white/10 rounded text-neon-blue focus:ring-neon-blue"
                      />
                      <span className="text-sm text-gray-300">Vedette</span>
                    </label>
                    
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                        className="w-5 h-5 bg-white/5 border border-white/10 rounded text-neon-blue focus:ring-neon-blue"
                      />
                      <span className="text-sm text-gray-300">Publié</span>
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-all"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg text-white font-medium hover:shadow-lg hover:shadow-neon-blue/30 transition-all"
                  >
                    {project ? 'Mettre à jour' : 'Créer le projet'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectEditModal;
