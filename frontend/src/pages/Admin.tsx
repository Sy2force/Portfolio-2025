import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaLock, FaPlus, FaEdit, FaTrash, FaSave } from 'react-icons/fa'

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
  category: string
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    image: '',
    technologies: [],
    github: '',
    demo: '',
    category: '',
  })

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple auth check (in production, use proper authentication)
    if (password === 'admin123') {
      setIsAuthenticated(true)
    }
  }

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      const project: Project = {
        id: Date.now(),
        title: newProject.title || '',
        description: newProject.description || '',
        image: newProject.image || '',
        technologies: newProject.technologies || [],
        github: newProject.github || '',
        demo: newProject.demo || '',
        category: newProject.category || '',
      }
      setProjects([...projects, project])
      setNewProject({
        title: '',
        description: '',
        image: '',
        technologies: [],
        github: '',
        demo: '',
        category: '',
      })
    }
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  const handleSaveProject = () => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p))
      setEditingProject(null)
    }
  }

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-8 max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
              <FaLock size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-gradient mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-400">Entrez le mot de passe pour accéder</p>
          </div>

          <form onSubmit={handleAuth}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full px-4 py-3 glass-card rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition-all duration-300 mb-4"
            />
            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-display font-semibold uppercase tracking-wider"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Se connecter
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-display font-bold mb-6">
            <span className="text-gradient">Dashboard Admin</span>
          </h1>
          <p className="text-xl text-gray-300">
            Gérez vos projets et votre contenu
          </p>
        </motion.div>

        {/* Add New Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-display font-bold text-gradient mb-6">
            Ajouter un nouveau projet
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Titre du projet"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="px-4 py-3 glass-card rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue/50"
            />
            <input
              type="text"
              placeholder="Catégorie"
              value={newProject.category}
              onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
              className="px-4 py-3 glass-card rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue/50"
            />
          </div>
          
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="w-full px-4 py-3 glass-card rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 mb-4"
            rows={3}
          />
          
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="URL de l'image"
              value={newProject.image}
              onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
              className="px-4 py-3 glass-card rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue/50"
            />
            <input
              type="text"
              placeholder="Lien GitHub"
              value={newProject.github}
              onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
              className="px-4 py-3 glass-card rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue/50"
            />
            <input
              type="text"
              placeholder="Lien Demo"
              value={newProject.demo}
              onChange={(e) => setNewProject({ ...newProject, demo: e.target.value })}
              className="px-4 py-3 glass-card rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue/50"
            />
          </div>
          
          <motion.button
            onClick={handleAddProject}
            className="px-6 py-3 bg-gradient-to-r from-neon-green to-neon-blue rounded-lg font-display font-semibold uppercase tracking-wider flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus />
            Ajouter le projet
          </motion.button>
        </motion.div>

        {/* Projects List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-8"
        >
          <h2 className="text-2xl font-display font-bold text-gradient mb-6">
            Projets existants
          </h2>
          
          {projects.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              Aucun projet pour le moment
            </p>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="flex items-center justify-between p-4 glass-card rounded-lg"
                  whileHover={{ scale: 1.01 }}
                >
                  {editingProject?.id === project.id ? (
                    <div className="flex-1 mr-4">
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        className="w-full px-3 py-2 glass-card rounded bg-white/5 text-white mb-2"
                      />
                      <textarea
                        value={editingProject.description}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full px-3 py-2 glass-card rounded bg-white/5 text-white"
                        rows={2}
                      />
                    </div>
                  ) : (
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                      <p className="text-gray-400 text-sm">{project.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="px-2 py-1 text-xs glass-card rounded text-neon-blue">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    {editingProject?.id === project.id ? (
                      <motion.button
                        onClick={handleSaveProject}
                        className="p-2 glass-card rounded text-green-400 hover:bg-green-400/20"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaSave />
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={() => setEditingProject(project)}
                        className="p-2 glass-card rounded text-neon-blue hover:bg-neon-blue/20"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaEdit />
                      </motion.button>
                    )}
                    <motion.button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 glass-card rounded text-red-400 hover:bg-red-400/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Admin
