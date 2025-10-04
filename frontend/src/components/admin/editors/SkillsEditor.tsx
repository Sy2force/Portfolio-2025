import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiTrash, HiPencil } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { getAllSkills, createSkill, updateSkill, deleteSkill } from '../../../services/contentApi';

interface Skill {
  _id?: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'marketing' | 'other';
  icon: string;
  description?: string;
  order: number;
}

const SkillsEditor = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptySkill: Skill = {
    name: '',
    level: 50,
    category: 'frontend',
    icon: '⚡',
    description: '',
    order: 0,
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await getAllSkills();
      setSkills(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des compétences');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (skill: Skill) => {
    try {
      if (skill._id) {
        await updateSkill(skill._id, skill);
        toast.success('Compétence mise à jour ! ✅');
      } else {
        await createSkill(skill);
        toast.success('Compétence ajoutée ! 🎉');
      }
      loadSkills();
      setShowForm(false);
      setEditingSkill(null);
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) return;
    
    try {
      await deleteSkill(id);
      toast.success('Compétence supprimée');
      loadSkills();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingSkill(emptySkill);
    setShowForm(true);
  };

  if (loading) {
    return <div className="text-center text-gray-400">Chargement...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">
          Compétences ({skills.length})
        </h3>
        <motion.button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-green to-neon-blue rounded-xl text-white font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiPlus className="w-5 h-5" />
          Nouvelle compétence
        </motion.button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <motion.div
            key={skill._id}
            className="bg-dark-secondary/50 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:border-neon-green/50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{skill.icon}</span>
                <div>
                  <h4 className="font-semibold text-white">{skill.name}</h4>
                  <span className="text-xs text-gray-400 capitalize">{skill.category}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <HiPencil className="w-4 h-4 text-neon-blue" />
                </button>
                <button
                  onClick={() => skill._id && handleDelete(skill._id)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <HiTrash className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Niveau</span>
                <span>{skill.level}%</span>
              </div>
              <div className="h-2 bg-dark-primary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-neon-green to-neon-blue"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
            
            {skill.description && (
              <p className="text-xs text-gray-400 mt-2">{skill.description}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && editingSkill && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-secondary rounded-2xl border border-white/10 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold text-white mb-6">
              {editingSkill._id ? 'Modifier' : 'Nouvelle'} compétence
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={editingSkill.name}
                    onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icône (emoji)
                  </label>
                  <input
                    type="text"
                    value={editingSkill.icon}
                    onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Catégorie
                  </label>
                  <select
                    value={editingSkill.category}
                    onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
                    className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="tools">Outils</option>
                    <option value="marketing">Marketing</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Niveau ({editingSkill.level}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editingSkill.level}
                    onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description (optionnel)
                </label>
                <textarea
                  value={editingSkill.description}
                  onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-green focus:ring-2 focus:ring-neon-green/20"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingSkill(null);
                }}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => handleSave(editingSkill)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-neon-green to-neon-blue rounded-xl text-white font-medium"
              >
                Sauvegarder
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SkillsEditor;
