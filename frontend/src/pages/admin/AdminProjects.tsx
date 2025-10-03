import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaStar, FaSearch } from 'react-icons/fa';
import ProjectEditModal from '../../components/admin/ProjectEditModal';
import toast from 'react-hot-toast';
import { api } from '../../services/api';

interface Project {
  _id: string;
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
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, filterCategory]);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects/admin');
      setProjects(response.data.projects);
      setFilteredProjects(response.data.projects);
    } catch (error) {
      toast.error('Erreur lors du chargement des projets');
    } finally {
      setIsLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = [...projects];

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(project => project.category === filterCategory);
    }

    setFilteredProjects(filtered);
  };

  const handleCreateProject = () => {
    setSelectedProject(undefined);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleSaveProject = async (projectData: any) => {
    try {
      if (selectedProject) {
        // Update existing project
        const response = await api.put(`/projects/${selectedProject._id}`, projectData);
        setProjects(prev => prev.map(p => p._id === selectedProject._id ? response.data.project : p));
        toast.success('Projet mis à jour avec succès');
      } else {
        // Create new project
        const response = await api.post('/projects', projectData);
        setProjects(prev => [response.data.project, ...prev]);
        toast.success('Projet créé avec succès');
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde du projet');
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

    try {
      await api.delete(`/projects/${projectId}`);
      setProjects(prev => prev.filter(p => p._id !== projectId));
      toast.success('Projet supprimé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression du projet');
    }
  };

  const handleTogglePublish = async (project: Project) => {
    try {
      const response = await api.patch(`/projects/${project._id}/publish`, {
        isPublished: !project.isPublished
      });
      setProjects(prev => prev.map(p => p._id === project._id ? response.data.project : p));
      toast.success(project.isPublished ? 'Projet dépublié' : 'Projet publié');
    } catch (error) {
      toast.error('Erreur lors de la modification du statut');
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const response = await api.patch(`/projects/${project._id}/featured`, {
        featured: !project.featured
      });
      setProjects(prev => prev.map(p => p._id === project._id ? response.data.project : p));
      toast.success(project.featured ? 'Retiré de la une' : 'Mis en avant');
    } catch (error) {
      toast.error('Erreur lors de la modification');
    }
  };

  const categories = ['all', 'Web Development', 'Mobile App', 'Design', 'AI/ML', 'Other'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Gestion des Projets</h1>
          <p className="text-gray-400 mt-1">{projects.length} projets au total</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreateProject}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl text-white font-medium hover:shadow-lg hover:shadow-neon-blue/30 transition-all"
        >
          <FaPlus />
          <span>Nouveau Projet</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un projet..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue transition-all"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Toutes les catégories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 overflow-hidden group"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || '/placeholder-project.jpg'}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Status Badges */}
                  <div className="absolute top-2 left-2 flex gap-2">
                    {project.featured && (
                      <span className="px-2 py-1 bg-yellow-500/90 backdrop-blur text-xs rounded-full text-white flex items-center gap-1">
                        <FaStar size={10} /> Vedette
                      </span>
                    )}
                    {!project.isPublished && (
                      <span className="px-2 py-1 bg-red-500/90 backdrop-blur text-xs rounded-full text-white">
                        Brouillon
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleTogglePublish(project)}
                      className="p-2 bg-black/50 backdrop-blur rounded-lg text-white hover:bg-black/70 transition-all"
                    >
                      {project.isPublished ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleFeatured(project)}
                      className="p-2 bg-black/50 backdrop-blur rounded-lg text-white hover:bg-black/70 transition-all"
                    >
                      <FaStar size={14} className={project.featured ? 'text-yellow-400' : ''} />
                    </motion.button>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <span className="text-xs text-gray-400">{project.year}</span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span key={tech} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>{project.views} vues</span>
                    <span>{project.likes} likes</span>
                    <span className="px-2 py-1 bg-white/5 rounded">
                      {project.status === 'completed' && 'Terminé'}
                      {project.status === 'in-progress' && 'En cours'}
                      {project.status === 'planned' && 'Planifié'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEditProject(project)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-neon-blue/20 hover:bg-neon-blue/30 rounded-lg text-neon-blue transition-all"
                    >
                      <FaEdit size={14} />
                      <span>Modifier</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteProject(project._id)}
                      className="flex items-center justify-center px-3 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 transition-all"
                    >
                      <FaTrash size={14} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 mb-4">Aucun projet trouvé</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateProject}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl text-white font-medium hover:shadow-lg hover:shadow-neon-blue/30 transition-all"
          >
            <FaPlus />
            <span>Créer votre premier projet</span>
          </motion.button>
        </motion.div>
      )}

      {/* Edit Modal */}
      <ProjectEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        onSave={handleSaveProject}
      />
    </div>
  );
};

export default AdminProjects;
