import React from 'react'

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "Arrow Agency",
      description: "UI/UX Design et branding complet pour une agence créative",
      image: "/images/arrow-agency.jpg",
      technologies: ["Figma", "Adobe Suite", "Branding"],
      category: "Design"
    },
    {
      id: 2,
      title: "JetsetPack",
      description: "E-commerce et stratégie marketing pour une marque de voyage",
      image: "/images/jetsetpack.jpg",
      technologies: ["WordPress", "WooCommerce", "Meta Ads"],
      category: "E-commerce"
    },
    {
      id: 3,
      title: "1948 Agency",
      description: "Stratégie de contenu et design pour agence historique",
      image: "/images/1948-agency.jpg",
      technologies: ["Content Strategy", "Social Media", "Design"],
      category: "Marketing"
    },
    {
      id: 4,
      title: "Koogoo Box",
      description: "Branding et campagnes publicitaires pour startup food",
      image: "/images/koogoo-box.jpg",
      technologies: ["Branding", "Meta Ads", "Google Ads"],
      category: "Branding"
    },
    {
      id: 5,
      title: "FuturistCards",
      description: "Application React pour cartes de visite digitales",
      image: "/images/futurist-cards.jpg",
      technologies: ["React", "TypeScript", "Node.js"],
      category: "Development"
    },
    {
      id: 6,
      title: "Portfolio 2025",
      description: "Portfolio fullstack dynamique avec admin panel",
      image: "/images/portfolio-2025.jpg",
      technologies: ["React", "Node.js", "MongoDB", "TypeScript"],
      category: "Development"
    }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mes Projets
          </span>
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{project.title}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {project.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
          >
            Discutons de votre projet
          </a>
        </div>
      </div>
    </div>
  )
}

export default Projects
