import React from 'react'

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            À Propos de Moi
          </span>
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-6xl font-bold">
                SA
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Shay Acoca</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Développeur Full-Stack passionné et Expert en Marketing Digital basé à Jérusalem. 
                Avec plus de 3 années d'expérience, j'ai accompagné 50+ clients dans la réalisation 
                de leurs projets digitaux.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎓</span>
                  <span>Formation HackerU Full-Stack (400h en cours)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💼</span>
                  <span>Ex-Bezeq (2022-2024) + Freelance Marketing</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏆</span>
                  <span>Certifications Meta Blueprint, Wix, Figma UI/UX</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌍</span>
                  <span>Trilingue: Français, Hébreu, Anglais</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Mes Compétences</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-4">Frontend</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  React, TypeScript, Tailwind CSS, Next.js, Vite
                </p>
              </div>
              <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-4">Backend</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Node.js, Express, MongoDB, JWT, API REST
                </p>
              </div>
              <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold mb-4">Marketing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Meta Ads, Google Ads, Analytics, SEO
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
