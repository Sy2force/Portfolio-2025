'use client';

import { motion } from 'framer-motion';
import { 
  DocumentArrowDownIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';

const CVComplete = () => {
  const handleDownloadPDF = () => {
    // Simulation du téléchargement - à remplacer par votre logique
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'CV_Shay_Acoca.pdf';
    link.click();
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-600 text-sm font-medium mb-6">
            <DocumentArrowDownIcon className="w-4 h-4" />
            Curriculum Vitae
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shay Acoca
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
            Expert Marketing Digital, Créateur de Contenu, Designer & Développeur Full-Stack
          </h2>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            <DocumentArrowDownIcon className="w-5 h-5" />
            Télécharger PDF
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                Contact
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="w-4 h-4 text-gray-500" />
                  <a href="mailto:shayacoca20@gmail.com" className="text-blue-600 hover:underline">
                    shayacoca20@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-4 h-4 text-gray-500" />
                  <a href="tel:+972533700551" className="text-gray-700 hover:text-blue-600">
                    +972 53 370 0551
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPinIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Jérusalem & Tel Aviv, Israël</span>
                </div>
                <div className="flex items-center gap-3">
                  <GlobeAltIcon className="w-4 h-4 text-gray-500" />
                  <a href="https://shayacoca.com" className="text-blue-600 hover:underline">
                    shayacoca.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <LanguageIcon className="w-5 h-5 text-blue-600" />
                Langues
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Hébreu</span>
                  <span className="text-sm text-gray-500">Natif</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Français</span>
                  <span className="text-sm text-gray-500">Courant</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Anglais</span>
                  <span className="text-sm text-gray-500">Courant</span>
                </div>
              </div>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CodeBracketIcon className="w-5 h-5 text-blue-600" />
                Compétences Techniques
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Frontend</h4>
                  <div className="flex flex-wrap gap-1">
                    {['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS'].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Backend</h4>
                  <div className="flex flex-wrap gap-1">
                    {['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'JWT'].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Marketing</h4>
                  <div className="flex flex-wrap gap-1">
                    {['Google Analytics', 'SEO', 'Content Marketing', 'Social Media', 'Email Marketing'].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Outils</h4>
                  <div className="flex flex-wrap gap-1">
                    {['Git', 'Docker', 'VS Code', 'Figma', 'WordPress'].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Professional Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Résumé Professionnel
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Fort de <strong>3 ans d'expérience</strong> en marketing digital et création de contenu, 
                et plus d'<strong>1 an en développement full-stack</strong>. Formation marketing digital 
                complétée en 2024, actuellement en perfectionnement full-stack chez HackerU jusqu'en 
                janvier 2026. Je combine expertise marketing et compétences techniques pour créer des 
                solutions web complètes et performantes, avec une approche centrée sur les résultats 
                et l'expérience utilisateur.
              </p>
            </motion.div>

            {/* Professional Experience */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BriefcaseIcon className="w-6 h-6 text-blue-600" />
                Expériences Professionnelles
              </h3>
              <div className="space-y-8">
                {/* Experience 1 */}
                <div className="border-l-4 border-blue-200 pl-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900">
                      Expert Création de Contenu & Design Web
                    </h4>
                    <span className="text-sm text-blue-600 font-medium">2021 - Présent</span>
                  </div>
                  <p className="text-gray-600 mb-3">Freelance • Marketing Digital</p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Création de contenu viral et engageant (200+ contenus produits)</li>
                    <li>• Développement de sites web performants (50+ sites réalisés)</li>
                    <li>• Stratégie digitale et optimisation SEO pour diverses entreprises</li>
                    <li>• Gestion de campagnes marketing multi-canal avec ROI positif</li>
                    <li>• Formation et conseil en marketing digital</li>
                  </ul>
                </div>

                {/* Experience 2 */}
                <div className="border-l-4 border-green-200 pl-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900">
                      Développeur Full-Stack
                    </h4>
                    <span className="text-sm text-green-600 font-medium">2023 - Présent</span>
                  </div>
                  <p className="text-gray-600 mb-3">Projets Personnels & Freelance</p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Développement d'applications web modernes avec React/Next.js</li>
                    <li>• Architecture backend Node.js/Express avec bases de données MongoDB</li>
                    <li>• Intégration d'APIs tierces et services de paiement</li>
                    <li>• Déploiement et maintenance d'applications en production</li>
                    <li>• Collaboration avec designers et clients pour des solutions sur mesure</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <AcademicCapIcon className="w-6 h-6 text-blue-600" />
                Formation
              </h3>
              <div className="space-y-6">
                {/* Education 1 */}
                <div className="border-l-4 border-purple-200 pl-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900">
                      HackerU - Full-Stack Developer
                    </h4>
                    <span className="text-sm text-purple-600 font-medium">Nov 2024 - Jan 2026</span>
                  </div>
                  <p className="text-gray-600 mb-3">Formation intensive • 800+ heures</p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• React, Node.js, TypeScript - Développement moderne</li>
                    <li>• MongoDB, PostgreSQL - Gestion de bases de données</li>
                    <li>• DevOps et Cloud - Déploiement et scalabilité</li>
                    <li>• Méthodologies Agiles - Travail en équipe</li>
                    <li>• Projets pratiques - Applications complètes</li>
                  </ul>
                </div>

                {/* Education 2 */}
                <div className="border-l-4 border-orange-200 pl-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900">
                      Formation Marketing Digital
                    </h4>
                    <span className="text-sm text-orange-600 font-medium">Jan 2024 - Juil 2024</span>
                  </div>
                  <p className="text-gray-600 mb-3">Formation intensive • 7 mois</p>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• SEO/SEM avancé - Optimisation et référencement</li>
                    <li>• Google Analytics & Ads - Analyse et publicité</li>
                    <li>• Social Media Marketing - Stratégies réseaux sociaux</li>
                    <li>• Email Marketing - Campagnes automatisées</li>
                    <li>• Content Strategy - Création de contenu engageant</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Key Projects */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Projets Principaux
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Plateforme Portfolios Professionnels
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">2024</p>
                  <p className="text-sm text-gray-700">
                    Solution moderne de création de portfolios avec React/Next.js et MongoDB.
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Site Services Marketing
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">2024</p>
                  <p className="text-sm text-gray-700">
                    Site vitrine avec générateur QR codes et analytics intégrés.
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">
                    Transformation Agence Marketing
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">2021-2024</p>
                  <p className="text-sm text-gray-700">
                    Croissance de 250% des abonnés et 180% des revenus.
                  </p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">
                    E-commerce Platform
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">En cours</p>
                  <p className="text-sm text-gray-700">
                    Plateforme complète avec paiement sécurisé (MERN Stack).
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CVComplete;
