'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="22 6 12 13 2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.title = 'Contact - Shay Acoca | Portfolio Digital Marketing & Développement';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && (data.status === 'success' || data.success)) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      // Contact form submission failed
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#3C3C66] to-[#0a0a23] relative overflow-hidden">
      {/* Matrix Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00FFAA] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#888EF0] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse [animation-delay:2s]"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#3C3C66] rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse [animation-delay:4s]"></div>
      </div>

      <div className="relative z-10 container-custom section-spacing">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold matrix-text-animated mb-6 font-secondary">
            Contactez-moi
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            Vous avez un projet en tête ? Transformons vos idées en réalité digitale exceptionnelle.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold matrix-text mb-8 font-secondary">
                Informations de contact
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00FFAA] to-[#888EF0] rounded-2xl shadow-matrix flex-shrink-0">
                    <MailIcon />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                    <p className="text-white/70 text-lg">shayacoca@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#888EF0] to-[#3C3C66] rounded-2xl shadow-matrix flex-shrink-0">
                    <PhoneIcon />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Téléphone</h3>
                    <p className="text-white/70 text-lg">+972 XX XXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#3C3C66] to-[#00FFAA] rounded-2xl shadow-matrix flex-shrink-0">
                    <MapPinIcon />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Localisation</h3>
                    <p className="text-white/70 text-lg">Jérusalem, Israël</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8">
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-[#00FFAA]/20 border border-[#00FFAA]/30 text-[#00FFAA] rounded-2xl glass-card">
                  Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 text-red-400 rounded-2xl glass-card">
                  Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement.
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-white mb-3">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 glass-input text-white placeholder-white/50 transition-all duration-300 focus:ring-2 focus:ring-[#00FFAA] focus:border-[#00FFAA]"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-white mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 glass-input text-white placeholder-white/50 transition-all duration-300 focus:ring-2 focus:ring-[#00FFAA] focus:border-[#00FFAA]"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-lg font-semibold text-white mb-3">
                  Sujet *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  minLength={5}
                  className="w-full px-6 py-4 glass-input text-white placeholder-white/50 transition-all duration-300 focus:ring-2 focus:ring-[#00FFAA] focus:border-[#00FFAA]"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-lg font-semibold text-white mb-3">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                  rows={6}
                  className="w-full px-6 py-4 glass-input text-white placeholder-white/50 resize-none transition-all duration-300 focus:ring-2 focus:ring-[#00FFAA] focus:border-[#00FFAA]"
                  placeholder="Décrivez votre projet ou posez votre question..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#3C3C66] to-[#00FFAA] hover:from-[#888EF0] hover:to-[#00FFAA] disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-matrix flex items-center justify-center gap-3 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <SendIcon />
                    Envoyer le message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
