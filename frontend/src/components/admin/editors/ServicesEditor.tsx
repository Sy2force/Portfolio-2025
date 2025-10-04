import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiTrash, HiPencil } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { getAllServices, createService, updateService, deleteService } from '../../../services/contentApi';

interface Service {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  price: string;
  duration: string;
  technologies: string[];
  features: string[];
  order: number;
  active: boolean;
}

const ServicesEditor = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);

  const emptyService: Service = {
    title: '',
    description: '',
    icon: '🚀',
    price: 'Sur devis',
    duration: '2-4 semaines',
    technologies: [],
    features: [],
    order: 0,
    active: true,
  };

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getAllServices();
      setServices(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des services');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (service: Service) => {
    try {
      if (service._id) {
        await updateService(service._id, service);
        toast.success('Service mis à jour ! ✅');
      } else {
        await createService(service);
        toast.success('Service ajouté ! 🎉');
      }
      loadServices();
      setShowForm(false);
      setEditingService(null);
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return;
    
    try {
      await deleteService(id);
      toast.success('Service supprimé');
      loadServices();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Chargement...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">
          Services ({services.length})
        </h3>
        <motion.button
          onClick={() => {
            setEditingService(emptyService);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-orange to-neon-yellow rounded-xl text-white font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiPlus className="w-5 h-5" />
          Nouveau service
        </motion.button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <motion.div
            key={service._id}
            className="bg-dark-secondary/50 backdrop-blur-xl rounded-xl border border-white/10 p-6"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{service.icon}</span>
                <div>
                  <h4 className="font-bold text-white text-lg">{service.title}</h4>
                  <p className="text-sm text-gray-400">{service.price} • {service.duration}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingService(service);
                    setShowForm(true);
                  }}
                  className="p-2 hover:bg-white/5 rounded-lg"
                >
                  <HiPencil className="w-4 h-4 text-neon-orange" />
                </button>
                <button
                  onClick={() => service._id && handleDelete(service._id)}
                  className="p-2 hover:bg-white/5 rounded-lg"
                >
                  <HiTrash className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">{service.description}</p>
            
            {service.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && editingService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-secondary rounded-2xl border border-white/10 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold text-white mb-6">
              {editingService._id ? 'Modifier' : 'Nouveau'} service
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icône
                  </label>
                  <input
                    type="text"
                    value={editingService.icon}
                    onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prix
                  </label>
                  <input
                    type="text"
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Durée
                  </label>
                  <input
                    type="text"
                    value={editingService.duration}
                    onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Technologies (séparées par des virgules)
                </label>
                <input
                  type="text"
                  value={editingService.technologies.join(', ')}
                  onChange={(e) => setEditingService({ 
                    ...editingService, 
                    technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                  })}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-orange"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingService(null);
                }}
                className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white"
              >
                Annuler
              </button>
              <button
                onClick={() => handleSave(editingService)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-neon-orange to-neon-yellow rounded-xl text-white font-medium"
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

export default ServicesEditor;
