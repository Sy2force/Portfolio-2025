'use client';

import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function AvailabilityPage() {
  const availability = [
    {
      type: 'Petits projets',
      duration: '1-2 semaines',
      status: 'available',
      availability: 'Disponibilité immédiate',
      description: 'Sites vitrines, landing pages, optimisations, audits',
      color: 'bg-green-100 text-green-800'
    },
    {
      type: 'Projets moyens',
      duration: '1-2 mois',
      status: 'available',
      availability: 'Disponible dans 2 semaines',
      description: 'Applications web, e-commerce, plateformes personnalisées',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      type: 'Projets longs',
      duration: '3 mois et plus',
      status: 'limited',
      availability: 'À partir de janvier 2026',
      description: 'SaaS complet, solutions entreprise, projets d\'envergure',
      color: 'bg-purple-100 text-purple-800',
      note: 'Après obtention certification HackerU'
    }
  ];

  const workingHours = [
    { day: 'Dimanche', hours: '9h - 18h', active: true },
    { day: 'Lundi', hours: '9h - 18h', active: true },
    { day: 'Mardi', hours: '9h - 18h', active: true },
    { day: 'Mercredi', hours: '9h - 18h', active: true },
    { day: 'Jeudi', hours: '9h - 18h', active: true },
    { day: 'Vendredi', hours: '9h - 13h', active: true },
    { day: 'Samedi', hours: 'Fermé', active: false }
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
                  Disponibilité
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Actuellement disponible pour de nouveaux projets. 
                Consultez mes créneaux selon la taille de votre projet.
              </p>
            </motion.div>

            {/* Availability Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {availability.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-xl"
                >
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${item.color}`}>
                    <CalendarIcon className="w-4 h-4" />
                    {item.type}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{item.duration}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  <div className={`flex items-center gap-2 mb-4 ${
                    item.status === 'available' ? 'text-green-600' : 'text-purple-600'
                  }`}>
                    <CheckCircleIcon className="w-5 h-5" />
                    <span className="font-medium">{item.availability}</span>
                  </div>
                  
                  {item.note && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-500 flex items-start gap-2">
                        <InformationCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {item.note}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl p-12 shadow-xl mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">Horaires de Travail</h2>
              
              <div className="max-w-2xl mx-auto">
                <div className="space-y-3">
                  {workingHours.map((schedule, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-4 rounded-lg ${
                        schedule.active ? 'bg-green-50' : 'bg-gray-50'
                      }`}
                    >
                      <span className={`font-medium ${
                        schedule.active ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {schedule.day}
                      </span>
                      <div className="flex items-center gap-2">
                        <ClockIcon className={`w-5 h-5 ${
                          schedule.active ? 'text-green-600' : 'text-gray-400'
                        }`} />
                        <span className={
                          schedule.active ? 'text-green-600 font-medium' : 'text-gray-400'
                        }>
                          {schedule.hours}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                  <p className="text-blue-800">
                    <strong>Note:</strong> Je suis basé à Jérusalem & Tel Aviv, Israël (GMT+2/GMT+3).
                    Les appels téléphoniques se font sur rendez-vous uniquement.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Current Status */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-12 text-white text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                <span className="ml-3 text-lg font-medium">Actuellement disponible</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                Prêt pour de nouveaux défis !
              </h2>
              
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Je suis toujours ouvert aux projets innovants et aux collaborations enrichissantes.
                N'hésitez pas à me contacter pour discuter de votre projet.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:shayacoca20@gmail.com"
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                >
                  Discuter d'un projet
                </a>
                <a
                  href="tel:+972533700551"
                  className="px-8 py-4 bg-white/20 backdrop-blur text-white border-2 border-white rounded-xl font-medium hover:bg-white/30 transition-all duration-300"
                >
                  Planifier un appel
                </a>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📍</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Localisation</h3>
                <p className="text-gray-600">Jérusalem & Tel Aviv, Israël</p>
                <p className="text-sm text-gray-500 mt-1">Travail remote possible</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⏱️</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Temps de réponse</h3>
                <p className="text-gray-600">Moins de 24h</p>
                <p className="text-sm text-gray-500 mt-1">Du dimanche au vendredi</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Langues</h3>
                <p className="text-gray-600">Français (natif)</p>
                <p className="text-sm text-gray-500 mt-1">Hébreu (courant) • Anglais (intermédiaire)</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
