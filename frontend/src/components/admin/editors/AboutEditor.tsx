import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiSave } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { getAboutContent, updateAboutContent } from '../../../services/contentApi';

const AboutEditor = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    name: '',
    bio: '',
    longBio: '',
    profileImage: '',
    email: '',
    phone: '',
    location: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      dribbble: '',
    },
    languages: [] as string[],
    interests: [] as string[],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const content = await getAboutContent();
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
      await updateAboutContent(data);
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
        <h3 className="text-xl font-bold text-white mb-6">Contenu À propos</h3>
        
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nom complet
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio courte (max 500 caractères)
            </label>
            <textarea
              value={data.bio}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
              rows={3}
              maxLength={500}
              className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
            />
            <p className="text-xs text-gray-400 mt-1">{data.bio.length}/500</p>
          </div>

          {/* Long Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Bio détaillée (max 2000 caractères)
            </label>
            <textarea
              value={data.longBio}
              onChange={(e) => setData({ ...data, longBio: e.target.value })}
              rows={6}
              maxLength={2000}
              className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
            />
            <p className="text-xs text-gray-400 mt-1">{data.longBio.length}/2000</p>
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
                className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
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
                className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Localisation
            </label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
            />
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
                  placeholder="https://github.com/username"
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
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
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
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
                  placeholder="https://twitter.com/username"
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
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
                  placeholder="https://instagram.com/username"
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-purple focus:ring-2 focus:ring-neon-purple/20"
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
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-magenta to-neon-pink" />
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

export default AboutEditor;
