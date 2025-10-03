import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaEye, FaHeart, FaCode, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    technologies: string[];
    category: string;
    github?: string;
    demo?: string;
    featured?: boolean;
    year?: number;
    status?: string;
    views?: number;
    likes?: number;
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(project.likes || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const getStatusColor = (status?: string) => {
    switch(status) {
      case 'completed': return 'from-green-500 to-emerald-500';
      case 'in-progress': return 'from-yellow-500 to-orange-500';
      case 'planned': return 'from-gray-500 to-gray-600';
      default: return 'from-neon-blue to-neon-purple';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-neon-blue/50 transition-all duration-300">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay with quick actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="flex gap-3">
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 backdrop-blur-lg rounded-lg hover:bg-white/20 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub className="text-white" />
                  </a>
                )}
                {project.demo && (
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 backdrop-blur-lg rounded-lg hover:bg-white/20 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt className="text-white" />
                  </a>
                )}
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike();
                }}
                className={`p-2 rounded-lg transition-all ${
                  isLiked ? 'bg-red-500 text-white' : 'bg-white/10 backdrop-blur-lg text-white hover:bg-white/20'
                }`}
              >
                <FaHeart className={isLiked ? 'animate-pulse' : ''} />
              </button>
            </div>
          </div>

          {/* Status Badge */}
          {project.status && (
            <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${getStatusColor(project.status)} rounded-full text-white text-xs font-medium`}>
              {project.status === 'completed' && '✅ Terminé'}
              {project.status === 'in-progress' && '🚧 En cours'}
              {project.status === 'planned' && '📅 Planifié'}
            </div>
          )}

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white text-xs font-medium flex items-center gap-1">
              ⭐ Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech}
                className="px-2 py-1 bg-neon-blue/10 rounded-md text-neon-blue text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-white/10 rounded-md text-gray-400 text-xs">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <FaEye /> {project.views || 0}
              </span>
              <span className="flex items-center gap-1">
                <FaHeart className={isLiked ? 'text-red-500' : ''} /> {likes}
              </span>
            </div>
            {project.year && (
              <span className="flex items-center gap-1">
                <FaClock /> {project.year}
              </span>
            )}
          </div>

          {/* CTA Button */}
          <Link to={`/projects/${project._id}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 py-2 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-lg text-white font-medium hover:from-neon-blue/30 hover:to-neon-purple/30 transition-all border border-white/10 hover:border-neon-blue/50"
            >
              <span className="flex items-center justify-center gap-2">
                <FaCode /> Voir les détails
              </span>
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
