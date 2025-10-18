import React from 'react'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <section className="hero-section relative overflow-hidden min-h-screen flex items-center">
        {/* Photo de couverture en arrière-plan */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/photo-de-couverture.jpg" 
            alt="Shay Acoca - Développeur Full-Stack" 
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient pour améliorer la lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
                Je suis Shay Acoca
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
              Développeur Full-Stack & Expert Marketing Digital
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                ✅ Disponible immédiatement
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                📍 Jérusalem
              </span>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-cyan-300">30+</div>
                <div className="text-sm text-white/80">Projets</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-300">50+</div>
                <div className="text-sm text-white/80">Clients</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-green-300">95%</div>
                <div className="text-sm text-white/80">Rétention</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-300">24h</div>
                <div className="text-sm text-white/80">Réponse</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
              >
                💼 Discuter de votre projet
              </a>
              <a
                href="/projects"
                className="px-8 py-4 border-2 border-white text-white bg-white/10 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/20 transition-colors duration-200"
              >
                🎯 Voir mes réalisations
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mes Services
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-2">Développement Web Full-Stack</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">15+ projets réalisés</p>
              <p className="text-sm text-gray-500">React, Node.js, MongoDB, TypeScript</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Marketing Digital & Growth</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">+300% ROI moyen</p>
              <p className="text-sm text-gray-500">Meta Ads, Google Ads, Analytics</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">UI/UX Design & Branding</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">50+ designs créés</p>
              <p className="text-sm text-gray-500">Figma, Adobe Suite, Canva</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
