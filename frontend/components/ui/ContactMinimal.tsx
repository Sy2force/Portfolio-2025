'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactMinimal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // Form submission logic will be implemented
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact
          </h2>
          <p className="text-gray-600">
            Discutons de votre projet
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nom"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors"
              required
            />
          </div>
          <textarea
            placeholder="Message"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors resize-none"
            required
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Envoyer
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">Ou directement par email :</p>
          <a
            href="mailto:contact@shayacoca.com"
            className="text-gray-900 hover:underline font-medium"
          >
            contact@shayacoca.com
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMinimal;
