'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Form submission state - used in handleSubmit function
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Travaillons ensemble
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Un projet en tête ? Une question ? N'hésitez pas à me contacter 
            pour discuter de vos besoins.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Restons en contact
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">📧</span>
                  </div>
                  <span className="text-gray-700">contact@shayacoca.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">📍</span>
                  </div>
                  <span className="text-gray-700">Tel Aviv, Israël</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">⏰</span>
                  </div>
                  <span className="text-gray-700">Réponse sous 24h</span>
                </div>
              </div>

              <div className="text-center md:text-left">
                <Link
                  href="/contact"
                  className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Page de contact complète
                </Link>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Message rapide
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Votre email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Votre message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-mono font-bold py-4 px-8 rounded-xl transition-all duration-300 border
                     ${isSubmitting 
                       ? 'bg-gray-600 text-gray-400 border-gray-600 cursor-not-allowed' 
                       : 'bg-[#00FFAA] text-[#0A0A0A] hover:bg-[#888EF0] hover:text-white shadow-[0_0_30px_rgba(0,255,170,0.3)] hover:shadow-[0_0_30px_rgba(136,142,240,0.5)] border-[#00FFAA] hover:border-[#888EF0]'
                     }`}
                >
                  {isSubmitting ? 'ENVOI EN COURS...' : 'ENVOYER MESSAGE'}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-900/20 border border-green-500/40 rounded-xl text-green-400 font-mono text-sm">
                    Message envoyé avec succès !
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-900/20 border border-red-500/40 rounded-xl text-red-400 font-mono text-sm">
                    Erreur lors de l'envoi. Veuillez réessayer.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
