import React from 'react'

const Services: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "Développement Web Full-Stack",
      description: "Applications web modernes avec React, Node.js et MongoDB",
      features: [
        "Sites web responsive",
        "Applications React/Next.js",
        "APIs REST sécurisées",
        "Base de données MongoDB",
        "Authentification JWT",
        "Déploiement cloud"
      ],
      price: "À partir de 2000€",
      duration: "2-6 semaines",
      icon: "💻"
    },
    {
      id: 2,
      title: "Marketing Digital & Growth",
      description: "Stratégies marketing pour augmenter votre visibilité et vos ventes",
      features: [
        "Campagnes Meta Ads",
        "Publicités Google Ads",
        "Optimisation SEO",
        "Analytics & reporting",
        "Social media management",
        "Email marketing"
      ],
      price: "À partir de 800€/mois",
      duration: "Contrat 3-12 mois",
      icon: "📈"
    },
    {
      id: 3,
      title: "UI/UX Design & Branding",
      description: "Design moderne et identité visuelle pour votre marque",
      features: [
        "Design UI/UX Figma",
        "Identité visuelle complète",
        "Logo et charte graphique",
        "Maquettes interactives",
        "Design system",
        "Assets marketing"
      ],
      price: "À partir de 1200€",
      duration: "1-4 semaines",
      icon: "🎨"
    }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mes Services
          </span>
        </h1>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div key={service.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
              
              <div className="space-y-3 mb-6">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{service.price}</div>
                  <div className="text-sm text-gray-500">{service.duration}</div>
                </div>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200">
                  Demander un devis
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Projet sur mesure ?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Chaque projet est unique. Discutons ensemble de vos besoins spécifiques 
            pour créer une solution parfaitement adaptée à vos objectifs.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
          >
            Contactez-moi
          </a>
        </div>
      </div>
    </div>
  )
}

export default Services
