import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaCamera, FaSave } from 'react-icons/fa';
import { useAdmin } from '../../contexts/AdminContext';
import toast from 'react-hot-toast';
import { api } from '../../services/api';

interface Profile {
  name: string;
  title: string;
  bio: string;
  longBio: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  availability: 'available' | 'busy' | 'unavailable';
  avatar: string;
  coverImage: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  yearsOfExperience: number;
  completedProjects: number;
  happyClients: number;
}

const AdminProfile = () => {
  const { } = useAdmin();
  const [profile, setProfile] = useState<Profile>({
    name: '',
    title: 'Full Stack Developer',
    bio: '',
    longBio: '',
    email: '',
    phone: '',
    location: 'Paris, France',
    headline: 'Creating Digital Experiences',
    availability: 'available',
    avatar: '/default-avatar.png',
    coverImage: '',
    socialLinks: {},
    yearsOfExperience: 0,
    completedProjects: 0,
    happyClients: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile');
      setProfile(response.data);
    } catch (error) {
      toast.error('Erreur lors du chargement du profil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put('/profile', profile);
      toast.success('Profil mis à jour avec succès');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await api.post('/profile/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfile(prev => ({ ...prev, avatar: response.data.avatar }));
      toast.success('Photo de profil mise à jour');
    } catch (error) {
      toast.error('Erreur lors de l\'upload');
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('cover', file);

    try {
      const response = await api.post('/profile/cover', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfile(prev => ({ ...prev, coverImage: response.data.cover }));
      toast.success('Image de couverture mise à jour');
    } catch (error) {
      toast.error('Erreur lors de l\'upload');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Mon Profil</h1>
        <p className="text-gray-400">Gérez vos informations personnelles et professionnelles</p>
      </div>

      {/* Cover & Avatar */}
      <div className="glass-card rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-48 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20">
          {profile.coverImage && (
            <img src={profile.coverImage} alt="Cover" className="w-full h-full object-cover" />
          )}
          <label className="absolute top-4 right-4 cursor-pointer">
            <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-black/50 backdrop-blur rounded-lg text-white hover:bg-black/70 transition-all"
            >
              <FaCamera />
            </motion.div>
          </label>
        </div>

        {/* Avatar */}
        <div className="px-6 pb-6">
          <div className="relative -mt-20 mb-4">
            <div className="relative inline-block">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-4 border-dark-primary object-cover"
              />
              <label className="absolute bottom-0 right-0 cursor-pointer">
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-neon-blue rounded-full text-white hover:bg-neon-purple transition-all"
                >
                  <FaCamera size={16} />
                </motion.div>
              </label>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nom</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Titre</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <FaEnvelope className="inline mr-2" />Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <FaPhone className="inline mr-2" />Téléphone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <FaMapMarkerAlt className="inline mr-2" />Localisation
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Disponibilité</label>
              <select
                value={profile.availability}
                onChange={(e) => setProfile({ ...profile, availability: e.target.value as any })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
              >
                <option value="available">✅ Disponible</option>
                <option value="busy">🔶 Occupé</option>
                <option value="unavailable">❌ Non disponible</option>
              </select>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio courte</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={2}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all resize-none"
              placeholder="Une brève description..."
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio détaillée</label>
            <textarea
              value={profile.longBio}
              onChange={(e) => setProfile({ ...profile, longBio: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all resize-none"
              placeholder="Votre parcours, vos passions..."
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="glass-card p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Réseaux sociaux</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaGithub className="inline mr-2" />GitHub
            </label>
            <input
              type="url"
              value={profile.socialLinks.github || ''}
              onChange={(e) => setProfile({
                ...profile,
                socialLinks: { ...profile.socialLinks, github: e.target.value }
              })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaLinkedin className="inline mr-2" />LinkedIn
            </label>
            <input
              type="url"
              value={profile.socialLinks.linkedin || ''}
              onChange={(e) => setProfile({
                ...profile,
                socialLinks: { ...profile.socialLinks, linkedin: e.target.value }
              })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaTwitter className="inline mr-2" />Twitter
            </label>
            <input
              type="url"
              value={profile.socialLinks.twitter || ''}
              onChange={(e) => setProfile({
                ...profile,
                socialLinks: { ...profile.socialLinks, twitter: e.target.value }
              })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
              placeholder="https://twitter.com/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <FaInstagram className="inline mr-2" />Instagram
            </label>
            <input
              type="url"
              value={profile.socialLinks.instagram || ''}
              onChange={(e) => setProfile({
                ...profile,
                socialLinks: { ...profile.socialLinks, instagram: e.target.value }
              })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
              placeholder="https://instagram.com/username"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="glass-card p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-4">Statistiques</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Années d'expérience</label>
            <input
              type="number"
              value={profile.yearsOfExperience}
              onChange={(e) => setProfile({ ...profile, yearsOfExperience: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Projets réalisés</label>
            <input
              type="number"
              value={profile.completedProjects}
              onChange={(e) => setProfile({ ...profile, completedProjects: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Clients satisfaits</label>
            <input
              type="number"
              value={profile.happyClients}
              onChange={(e) => setProfile({ ...profile, happyClients: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Headline</label>
            <input
              type="text"
              value={profile.headline}
              onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue transition-all"
              placeholder="Phrase d'accroche"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSave}
        disabled={isSaving}
        className="w-full py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-neon-blue/30 transition-all disabled:opacity-50"
      >
        {isSaving ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enregistrement...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <FaSave className="mr-2" />
            Enregistrer les modifications
          </span>
        )}
      </motion.button>
    </div>
  );
};

export default AdminProfile;
