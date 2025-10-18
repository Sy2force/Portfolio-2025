'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../../styles/progress-bar.css';
import {
  UserIcon,
  EnvelopeIcon,
  CogIcon,
  ChartBarIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
  FolderIcon,
  EyeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const AdminComplete = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data
  const stats = {
    projects: 6,
    messages: 12,
    views: 1234,
    visitors: 567
  };

  const messages = [
    {
      id: 1,
      sender: 'Jean Dupont',
      email: 'jean@example.com',
      subject: 'Collaboration projet',
      date: '2024-10-15',
      read: false
    },
    {
      id: 2,
      sender: 'Marie Martin',
      email: 'marie@example.com',
      subject: 'Demande de devis',
      date: '2024-10-14',
      read: true
    },
    {
      id: 3,
      sender: 'Pierre Durand',
      email: 'pierre@example.com',
      subject: 'Question technique',
      date: '2024-10-13',
      read: false
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'Plateforme Portfolios',
      status: 'En cours',
      date: '2024-10-01',
      progress: 70
    },
    {
      id: 2,
      title: 'Site Marketing Services',
      status: 'Terminé',
      date: '2024-09-15',
      progress: 100
    },
    {
      id: 3,
      title: 'E-commerce HackerU',
      status: 'En cours',
      date: '2024-10-10',
      progress: 35
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple (à remplacer par votre logique d'authentification)
    if (loginData.email === 'admin@shayacoca.com' && loginData.password === 'admin123456') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Identifiants incorrects');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: '', password: '' });
    setActiveTab('dashboard');
  };

  // Login Form
  if (!isLoggedIn) {
    return (
      <section className="py-24 bg-gray-50 min-h-screen flex items-center">
        <div className="max-w-md mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LockClosedIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Connexion Admin
              </h1>
              <p className="text-gray-600">
                Accédez au tableau de bord administrateur
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="admin@shayacoca.com"
                  title="Adresse email administrateur"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  title="Mot de passe administrateur"
                  required
                />
              </div>

              {loginError && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Se connecter
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 text-center">
                <strong>Demo:</strong> admin@shayacoca.com / admin123456
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Admin Dashboard
  return (
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Admin
            </h1>
            <p className="text-gray-600">
              Gestion du contenu du portfolio
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            Déconnexion
          </button>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {[
            { id: 'dashboard', label: 'Tableau de bord', icon: ChartBarIcon },
            { id: 'projects', label: 'Projets', icon: FolderIcon },
            { id: 'messages', label: 'Messages', icon: EnvelopeIcon },
            { id: 'settings', label: 'Paramètres', icon: CogIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FolderIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stats.projects}</span>
                </div>
                <h3 className="font-semibold text-gray-700">Projets</h3>
                <p className="text-sm text-gray-500">Total des projets</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <EnvelopeIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stats.messages}</span>
                </div>
                <h3 className="font-semibold text-gray-700">Messages</h3>
                <p className="text-sm text-gray-500">Messages reçus</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <EyeIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stats.views}</span>
                </div>
                <h3 className="font-semibold text-gray-700">Vues</h3>
                <p className="text-sm text-gray-500">Pages vues</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stats.visitors}</span>
                </div>
                <h3 className="font-semibold text-gray-700">Visiteurs</h3>
                <p className="text-sm text-gray-500">Visiteurs uniques</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Activité récente
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Nouveau message de Jean Dupont</span>
                  <span className="text-sm text-gray-500 ml-auto">Il y a 2h</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Projet "Plateforme Portfolios" mis à jour</span>
                  <span className="text-sm text-gray-500 ml-auto">Il y a 1j</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">50 nouvelles vues sur le portfolio</span>
                  <span className="text-sm text-gray-500 ml-auto">Il y a 2j</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                Gestion des Projets
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <PlusIcon className="w-4 h-4" />
                Ajouter un projet
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Titre</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Progrès</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {project.title}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            project.status === 'Terminé' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="progress-bar">
                            <div
                              className={`progress-fill progress-${Math.round(project.progress / 5) * 5}`}
                            >
                              <span className="sr-only">Progression: {project.progress}%</span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 mt-1">{project.progress}%</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {project.date}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              className="text-blue-600 hover:text-blue-700" 
                              title="Modifier le projet"
                              aria-label="Modifier le projet"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-700" 
                              title="Supprimer le projet"
                              aria-label="Supprimer le projet"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-gray-900">
              Messages Reçus
            </h3>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {messages.map((message) => (
                  <div key={message.id} className={`p-6 hover:bg-gray-50 ${!message.read ? 'bg-blue-50' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {message.sender}
                          </h4>
                          {!message.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{message.email}</p>
                        <p className="font-medium text-gray-800 mb-2">{message.subject}</p>
                        <p className="text-sm text-gray-500">{message.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm">
                          Voir
                        </button>
                        <button className="text-red-600 hover:text-red-700 text-sm">
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-gray-900">
              Paramètres
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Modifier le profil
                </h4>
                <div className="space-y-4">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Nom complet"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="profileEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="profileEmail"
                    name="profileEmail"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Sauvegarder
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Changer le mot de passe
                </h4>
                <div className="space-y-4">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe actuel
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    placeholder="Mot de passe actuel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Nouveau mot de passe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Changer
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Configuration SEO
                </h4>
                <div className="space-y-4">
                  <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Titre du site
                  </label>
                  <input
                    type="text"
                    id="siteTitle"
                    name="siteTitle"
                    placeholder="Titre du site"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Description du site
                  </label>
                  <textarea
                    id="siteDescription"
                    name="siteDescription"
                    placeholder="Description du site"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Mettre à jour
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Gestion des langues
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="lang-fr" className="text-gray-700">Français</label>
                    <input 
                      type="checkbox" 
                      id="lang-fr" 
                      defaultChecked 
                      className="rounded"
                      aria-label="Activer le français"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="lang-en" className="text-gray-700">English</label>
                    <input 
                      type="checkbox" 
                      id="lang-en" 
                      defaultChecked 
                      className="rounded"
                      aria-label="Activer l'anglais"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="lang-he" className="text-gray-700">עברית</label>
                    <input 
                      type="checkbox" 
                      id="lang-he" 
                      defaultChecked 
                      className="rounded"
                      aria-label="Activer l'hébreu"
                    />
                  </div>
                  <button className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AdminComplete;
