import { useState, useEffect, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { HiSave, HiDocumentText, HiUpload } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import { getCVContent, uploadCV, updateCVContent } from '../../../services/contentApi';

const CVEditor = () => {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [data, setData] = useState({
    pdfUrl: '',
    fileName: '',
    fileSize: 0,
    uploadedAt: '',
    experiences: [] as any[],
    education: [] as any[],
    certifications: [] as string[],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const content = await getCVContent();
      if (content) {
        setData(content);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement du CV');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setCvFile(file);
        toast.success(`Fichier sélectionné : ${file.name}`);
      } else {
        toast.error('Veuillez sélectionner un fichier PDF');
      }
    }
  };

  const handleUpload = async () => {
    if (!cvFile) {
      toast.error('Veuillez sélectionner un fichier');
      return;
    }

    setUploading(true);
    try {
      await uploadCV(cvFile);
      toast.success('CV uploadé avec succès ! 📄');
      loadData();
      setCvFile(null);
    } catch (error) {
      toast.error('Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateCVContent(data);
      toast.success('Informations mises à jour ! ✅');
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
      {/* Upload Section */}
      <div className="bg-dark-secondary/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Upload CV (PDF)</h3>
        
        {data.pdfUrl && (
          <div className="mb-6 p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl">
            <div className="flex items-center gap-3">
              <HiDocumentText className="w-8 h-8 text-neon-cyan" />
              <div className="flex-1">
                <p className="text-white font-medium">{data.fileName}</p>
                <p className="text-sm text-gray-400">
                  {(data.fileSize / 1024).toFixed(2)} KB • Uploadé le {new Date(data.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              <a
                href={data.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-neon-cyan/20 hover:bg-neon-cyan/30 rounded-lg text-neon-cyan transition-colors"
              >
                Voir
              </a>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="cv-upload"
            />
            <label
              htmlFor="cv-upload"
              className="flex items-center justify-center gap-3 w-full px-4 py-4 bg-dark-primary/50 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-neon-cyan hover:bg-neon-cyan/5 transition-all duration-300 group"
            >
              <HiUpload className="w-6 h-6 text-neon-cyan group-hover:scale-110 transition-transform" />
              <span className="text-gray-300 group-hover:text-white">
                {cvFile ? cvFile.name : 'Sélectionner un nouveau PDF'}
              </span>
            </label>
          </div>

          {cvFile && (
            <motion.button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full relative group overflow-hidden disabled:opacity-50"
              whileHover={{ scale: uploading ? 1 : 1.02 }}
              whileTap={{ scale: uploading ? 1 : 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-green" />
              <div className="relative flex items-center justify-center gap-3 px-6 py-3 rounded-xl">
                <HiUpload className="w-5 h-5 text-white" />
                <span className="font-bold text-white">
                  {uploading ? 'Upload en cours...' : 'Uploader le CV'}
                </span>
              </div>
            </motion.button>
          )}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-dark-secondary/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-6">Certifications</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Liste des certifications (une par ligne)
          </label>
          <textarea
            value={data.certifications.join('\n')}
            onChange={(e) => setData({ 
              ...data, 
              certifications: e.target.value.split('\n').filter(Boolean)
            })}
            rows={5}
            placeholder="AWS Certified Developer&#10;Google Analytics Certified&#10;Meta Marketing Professional"
            className="w-full px-4 py-3 bg-dark-primary/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
          />
        </div>

        <motion.button
          onClick={handleSave}
          disabled={saving}
          className="mt-6 w-full relative group overflow-hidden disabled:opacity-50"
          whileHover={{ scale: saving ? 1 : 1.02 }}
          whileTap={{ scale: saving ? 1 : 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-green" />
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

export default CVEditor;
