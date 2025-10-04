import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiSave } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { getHomeContent, updateHomeContent } from '../../../services/contentApi';

const HomeEditor = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({
    title: '',
    subtitle: '',
    description: '',
    heroImage: '',
    ctaText: '',
    ctaLink: '',
    stats: {
      yearsExperience: 0,
      completedProjects: 0,
      happyClients: 0,
      linesOfCode: 0,
    },
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const content = await getHomeContent();
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
      await updateHomeContent(data);
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
        <h3 className="text-xl font-bold text-white mb-6">Contenu de la page d'accueil</h3>
        
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Titre principal
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sous-titre
            </label>
            <input
              type="text"
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20"
            />
          </div>

          {/* CTA */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Texte du bouton
              </label>
              <input
                type="text"
                value={data.ctaText}
                onChange={(e) => setData({ ...data, ctaText: e.target.value })}
                className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Lien du bouton
              </label>
              <input
                type="text"
                value={data.ctaLink}
                onChange={(e) => setData({ ...data, ctaLink: e.target.value })}
                className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20"
              />
            </div>
          </div>

          {/* Stats */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Statistiques</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Années d'expérience
                </label>
                <input
                  type="number"
                  value={data.stats.yearsExperience}
                  onChange={(e) => setData({ 
                    ...data, 
                    stats: { ...data.stats, yearsExperience: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Projets complétés
                </label>
                <input
                  type="number"
                  value={data.stats.completedProjects}
                  onChange={(e) => setData({ 
                    ...data, 
                    stats: { ...data.stats, completedProjects: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Clients satisfaits
                </label>
                <input
                  type="number"
                  value={data.stats.happyClients}
                  onChange={(e) => setData({ 
                    ...data, 
                    stats: { ...data.stats, happyClients: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lignes de code
                </label>
                <input
                  type="number"
                  value={data.stats.linesOfCode}
                  onChange={(e) => setData({ 
                    ...data, 
                    stats: { ...data.stats, linesOfCode: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20"
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
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink" />
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

export default HomeEditor;
