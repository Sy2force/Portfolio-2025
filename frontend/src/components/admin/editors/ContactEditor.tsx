import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiSave } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { getContactContent, updateContactContent } from '../../../services/contentApi';

const ContactEditor = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    availability: '',
    responseTime: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
    },
    successMessage: '',
    errorMessage: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const content = await getContactContent();
      if (content) {
        setData(content);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContactContent(data);
      toast.success('Contenu mis à jour avec succès ! 🎉');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Chargement...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-dark-secondary/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Contenu de la page Contact</h3>
        
        <div className="space-y-4">
          {/* Title & Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Titre
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-magenta focus:ring-2 focus:ring-neon-magenta/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-magenta focus:ring-2 focus:ring-neon-magenta/20"
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-magenta focus:ring-2 focus:ring-neon-magenta/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-magenta focus:ring-2 focus:ring-neon-magenta/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Adresse
            </label>
            <input
              type="text"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-magenta focus:ring-2 focus:ring-neon-magenta/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Disponibilité
              </label>
              <input
                type="text"
                value={data.availability}
                onChange={(e) => setData({ ...data, availability: e.target.value })}
                placeholder="Disponible pour de nouveaux projets"
                className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-magenta focus:ring-2 focus:ring-neon-magenta/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Temps de réponse
              </label>
              <input
                type="text"
                value={data.responseTime}
                onChange={(e) => setData({ ...data, responseTime: e.target.value })}
                placeholder="Réponse sous 24-48h"
                className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-magenta focus:ring-2 focus:ring-neon-magenta/20"
              />
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Réseaux sociaux</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub
                </label>
                <input
                  type="url"
                  value={data.socialLinks.github}
                  onChange={(e) => setData({ 
                    ...data, 
                    socialLinks: { ...data.socialLinks, github: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-magenta focus:ring-2 focus:ring-neon-magenta/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={data.socialLinks.linkedin}
                  onChange={(e) => setData({ 
                    ...data, 
                    socialLinks: { ...data.socialLinks, linkedin: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-magenta focus:ring-2 focus:ring-neon-magenta/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  value={data.socialLinks.twitter}
                  onChange={(e) => setData({ 
                    ...data, 
                    socialLinks: { ...data.socialLinks, twitter: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-magenta focus:ring-2 focus:ring-neon-magenta/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  value={data.socialLinks.instagram}
                  onChange={(e) => setData({ 
                    ...data, 
                    socialLinks: { ...data.socialLinks, instagram: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-magenta focus:ring-2 focus:ring-neon-magenta/20"
                />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Messages de confirmation</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message de succès
                </label>
                <input
                  type="text"
                  value={data.successMessage}
                  onChange={(e) => setData({ ...data, successMessage: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-magenta focus:ring-2 focus:ring-neon-magenta/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message d'erreur
                </label>
                <input
                  type="text"
                  value={data.errorMessage}
                  onChange={(e) => setData({ ...data, errorMessage: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-magenta focus:ring-2 focus:ring-neon-magenta/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          disabled={saving}
          className="mt-6 w-full relative group overflow-hidden disabled:opacity-50"
          whileHover={{ scale: saving ? 1 : 1.02 }}
          whileTap={{ scale: saving ? 1 : 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-magenta via-neon-pink to-neon-orange" />
          <div className="relative flex items-center justify-center gap-3 px-6 py-4 rounded-xl">
            <HiSave className="w-5 h-5 text-white" />
            <span className="text-lg font-display font-bold text-white">
              {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default ContactEditor;
