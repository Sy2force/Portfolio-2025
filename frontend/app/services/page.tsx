'use client';

import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { CheckIcon, SparklesIcon, RocketLaunchIcon, ShoppingCartIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export default function ServicesPage() {
  const services = [
    {
      title: 'Portfolio Professionnel',
      icon: SparklesIcon,
      description: 'Site vitrine moderne + cartes digitales personnalisées',
      features: [
        'Design personnalisé et moderne',
        'Responsive mobile/desktop',
        'SEO optimisé',
        'Cartes de visite digitales',
        'QR Code personnalisé',
        'Hébergement 1 an inclus',
        'Support technique 3 mois'
      ],
      timeline: '2-3 semaines',
      popular: false
    },
    {
      title: 'Plateforme SaaS Sur Mesure',
      icon: RocketLaunchIcon,
      description: 'Solution complète comme FaceWork ou FuturistCards',
      features: [
        'Architecture scalable',
        'Authentification sécurisée',
        'Dashboard admin complet',
        'Paiements intégrés (Stripe)',
        'Analytics détaillés',
        'API REST complète',
        'Formation utilisateur',
        'Support 6 mois'
      ],
      timeline: '2-3 mois',
      popular: true
    },
    {
      title: 'E-Commerce',
      icon: ShoppingCartIcon,
      description: 'Boutique en ligne avec gestion complète',
      features: [
        'Catalogue produits illimité',
        'Paiements sécurisés',
        'Gestion inventaire',
        'Panel administration',
        'Multi-langues',
        'Emails automatisés',
        'SEO e-commerce',
        'Formation incluse'
      ],
      timeline: '1-2 mois',
      popular: false
    },
    {
      title: 'Consultation & Audit',
      icon: LightBulbIcon,
      description: 'Audit marketing et conseils stratégiques',
      features: [
        'Audit site web complet',
        'Analyse concurrentielle',
        'Stratégie marketing digital',
        'Optimisation SEO',
        'Plan d\'action détaillé',
        'Recommandations techniques',
        'Support par email'
      ],
      timeline: 'Flexible',
      popular: false
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mes Services
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Solutions complètes alliant marketing digital, design et développement.
                Contactez-moi pour discuter de votre projet et obtenir un devis personnalisé.
              </p>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl p-8 shadow-xl ${
                    service.popular ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Plus Populaire
                    </div>
                  )}
                  
                  <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                  
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Délai:</span> {service.timeline}
                    </p>
                  </div>
                  
                  <a
                    href="/contact"
                    className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-center block"
                  >
                    En savoir plus
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Guarantees */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-20 bg-white rounded-2xl p-12 shadow-xl"
            >
              <h2 className="text-3xl font-bold text-center mb-12">
                Mes Garanties
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Réponse sous 24h</h3>
                  <p className="text-gray-600">
                    Réponse rapide à toutes vos questions et demandes
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📄</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Devis Détaillé Gratuit</h3>
                  <p className="text-gray-600">
                    Estimation transparente et détaillée sans engagement
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Support Technique</h3>
                  <p className="text-gray-600">
                    Code source fourni et support technique inclus
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-20 text-center"
            >
              <h2 className="text-3xl font-bold mb-6">
                Prêt à démarrer votre projet ?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Contactez-moi pour discuter de votre projet et obtenir un devis personnalisé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:shayacoca20@gmail.com"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  Demander un devis
                </a>
                <a
                  href="/contact"
                  className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300"
                >
                  Me contacter
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
