import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaFilter, FaSearch } from 'react-icons/fa'
import ProjectCard from '../components/Projects/ProjectCard'
import { SEO } from '../utils/seo'

const projects = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'Plateforme e-commerce complète avec paiement Stripe, gestion des stocks, tableau de bord admin et analytics.',
    longDescription: 'Solution e-commerce moderne construite avec Next.js, offrant une expérience utilisateur fluide avec SSR/SSG, paiement sécurisé via Stripe, et un système de gestion complet.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    category: 'Full Stack',
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
    year: 2024,
  },
  {
    _id: '2',
    title: 'AI Analytics Dashboard',
    description: 'Dashboard analytique temps réel avec visualisations interactives et prédictions ML.',
    longDescription: 'Tableau de bord intelligent utilisant TensorFlow.js pour des prédictions en temps réel, avec des visualisations D3.js interactives.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    technologies: ['React', 'Python', 'TensorFlow', 'D3.js', 'FastAPI', 'Redis'],
    category: 'Data & AI',
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
    year: 2024,
  },
  {
    _id: '3',
    title: 'Social Media Platform',
    description: 'Réseau social nouvelle génération avec messagerie temps réel et partage de contenu.',
    longDescription: 'Plateforme sociale complète avec authentification OAuth, messagerie WebSocket, feed algorithmique et système de recommandations.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Socket.io', 'Redis', 'Docker'],
    category: 'Full Stack',
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
    year: 2023,
  },
  {
    _id: '4',
    title: 'Crypto Trading Bot',
    description: 'Bot de trading automatisé avec stratégies personnalisables et backtesting.',
    longDescription: 'Bot de trading crypto utilisant des algorithmes ML pour la prédiction de prix et l\'exécution automatique de trades.',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800',
    technologies: ['Python', 'React', 'WebSocket', 'TensorFlow', 'PostgreSQL'],
    category: 'FinTech',
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
    year: 2023,
  },
  {
    _id: '5',
    title: 'Task Management System',
    description: 'Application de gestion de tâches avec collaboration en temps réel.',
    longDescription: 'Système de gestion de projets complet avec Kanban boards, timeline Gantt, et collaboration temps réel.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'JWT'],
    category: 'Productivity',
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
    year: 2023,
  },
  {
    _id: '6',
    title: 'Video Streaming Platform',
    description: 'Plateforme de streaming vidéo avec transcoding et CDN.',
    longDescription: 'Service de streaming vidéo scalable avec transcoding automatique, CDN distribution et analytics détaillées.',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800',
    technologies: ['Next.js', 'AWS', 'FFmpeg', 'PostgreSQL', 'Redis'],
    category: 'Media',
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
    year: 2024,
  },
]

const categories = ['Tous', 'Full Stack', 'Data & AI', 'FinTech', 'Productivity', 'Media']

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'Tous' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Projets - Shaya Coca"
        description="Découvrez mes projets de développement web, applications full-stack et solutions innovantes."
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Mes <span className="text-gradient">Projets</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Découvrez mes réalisations en développement web et applications innovantes
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue/50 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 text-white focus:outline-none focus:border-neon-blue/50 transition-all"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-dark-primary text-white">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-sm mb-8"
        >
          {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}
        </motion.p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
