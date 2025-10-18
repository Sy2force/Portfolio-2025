import React from 'react'

const CV: React.FC = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Curriculum Vitae
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Développeur Full-Stack & Expert Marketing Digital
          </p>
          <a
            href="/cv/CV-Shay-Acoca.pdf"
            download
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
          >
            📄 Télécharger PDF
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
          {/* Profile */}
          <section>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                SA
              </div>
              <div>
                <h2 className="text-3xl font-bold">Shay Acoca</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">Développeur Full-Stack & Expert Marketing Digital</p>
                <p className="text-gray-500">📍 Jérusalem, Israël | 📧 shay.acoca@example.com | 📱 +972 XX XXX XXXX</p>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Expérience Professionnelle</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="text-xl font-semibold">Développeur Full-Stack Freelance</h4>
                <p className="text-gray-600 dark:text-gray-300">2022 - Présent</p>
                <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• Développement de 30+ applications web avec React, Node.js, MongoDB</li>
                  <li>• Accompagnement de 50+ clients dans leurs projets digitaux</li>
                  <li>• Taux de satisfaction client de 95% avec réponse sous 24h</li>
                  <li>• Spécialisation en e-commerce et applications métier</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h4 className="text-xl font-semibold">Expert Marketing Digital</h4>
                <p className="text-gray-600 dark:text-gray-300">Bezeq International | 2022 - 2024</p>
                <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>• Gestion de campagnes Meta Ads et Google Ads (+300% ROI moyen)</li>
                  <li>• Optimisation SEO et stratégies de contenu</li>
                  <li>• Analytics et reporting pour équipes marketing</li>
                  <li>• Formation des équipes aux outils digitaux</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-2xl font-bold mb-4 text-purple-600">Formation</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-6">
                <h4 className="text-xl font-semibold">Formation Développement Full-Stack</h4>
                <p className="text-gray-600 dark:text-gray-300">HackerU | 2024 - En cours (400h)</p>
                <p className="text-gray-700 dark:text-gray-300">React, Node.js, MongoDB, TypeScript, DevOps</p>
              </div>
              
              <div className="border-l-4 border-cyan-500 pl-6">
                <h4 className="text-xl font-semibold">Service Militaire</h4>
                <p className="text-gray-600 dark:text-gray-300">Tsahal | 2019 - 2022</p>
                <p className="text-gray-700 dark:text-gray-300">Leadership, travail d'équipe, gestion de projets</p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-2xl font-bold mb-4 text-cyan-600">Compétences Techniques</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vite'].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Backend</h4>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Express', 'MongoDB', 'JWT', 'API REST'].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Marketing & Design</h4>
                <div className="flex flex-wrap gap-2">
                  {['Meta Ads', 'Google Ads', 'Figma', 'Adobe Suite', 'SEO'].map(skill => (
                    <span key={skill} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h3 className="text-2xl font-bold mb-4 text-green-600">Certifications</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <h4 className="font-semibold">Meta Blueprint Certified</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Marketing Digital</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <h4 className="font-semibold">Figma UI/UX Certified</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Design Interface</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌐</span>
                <div>
                  <h4 className="font-semibold">Wix Expert Certified</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Développement Web</p>
                </div>
              </div>
            </div>
          </section>

          {/* Languages */}
          <section>
            <h3 className="text-2xl font-bold mb-4 text-orange-600">Langues</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-semibold">Français</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Natif</p>
              </div>
              <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-semibold">Hébreu</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Courant</p>
              </div>
              <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h4 className="font-semibold">Anglais</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Intermédiaire</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CV
