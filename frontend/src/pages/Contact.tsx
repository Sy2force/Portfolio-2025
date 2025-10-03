import { motion } from 'framer-motion'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, 
  FaGithub, FaTwitter, FaWhatsapp, FaPaperPlane 
} from 'react-icons/fa'

const contactInfo = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'contact@example.com',
    href: 'mailto:contact@example.com',
    color: 'hover:text-neon-blue',
  },
  {
    icon: FaPhone,
    label: 'Téléphone',
    value: '+33 6 12 34 56 78',
    href: 'tel:+33612345678',
    color: 'hover:text-neon-purple',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Localisation',
    value: 'Paris, France',
    href: '#',
    color: 'hover:text-neon-pink',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: 'Message Direct',
    href: 'https://wa.me/33612345678',
    color: 'hover:text-green-400',
  },
]

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
]

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Initialize EmailJS (replace with your actual service ID, template ID, and public key)
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'John Doe',
        },
        'YOUR_PUBLIC_KEY'
      )

      toast.success('Message envoyé avec succès!')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error:', error)
      toast.error('Erreur lors de l\'envoi du message. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            <span className="text-gradient">Contactez-moi</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discutons de votre projet et créons quelque chose d'extraordinaire ensemble
          </p>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-gradient mb-6">
                Envoyez-moi un message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  animate={{
                    scale: focusedField === 'name' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="name" className="block text-sm font-display text-gray-300 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 glass-card rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  animate={{
                    scale: focusedField === 'email' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="email" className="block text-sm font-display text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 glass-card rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-purple/50 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </motion.div>

                {/* Subject Field */}
                <motion.div
                  animate={{
                    scale: focusedField === 'subject' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="subject" className="block text-sm font-display text-gray-300 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 glass-card rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-pink/50 transition-all duration-300"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="project">Nouveau projet</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="job">Opportunité d'emploi</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Autre</option>
                  </select>
                </motion.div>

                {/* Message Field */}
                <motion.div
                  animate={{
                    scale: focusedField === 'message' ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="message" className="block text-sm font-display text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 glass-card rounded-lg bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-green/50 transition-all duration-300 resize-none"
                    placeholder="Décrivez votre projet ou votre demande..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-display font-semibold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Envoyer le message
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-8"
          >
            {/* Quick Contact */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-gradient mb-6">
                Contact Rapide
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target={info.label === 'WhatsApp' ? '_blank' : undefined}
                    rel={info.label === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-4 p-4 glass-card rounded-lg group transition-all duration-300 ${info.color}`}
                    whileHover={{ x: 5, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-lg flex items-center justify-center group-hover:from-neon-blue/30 group-hover:to-neon-purple/30 transition-all duration-300">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-gradient mb-6">
                Réseaux Sociaux
              </h2>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 glass-card rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-display font-bold text-gradient mb-6">
                Disponibilité
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-green-400 font-medium">Disponible pour nouveaux projets</span>
              </div>
              <p className="text-gray-400 text-sm">
                Je suis actuellement disponible pour des missions freelance et des collaborations. 
                Réponse garantie sous 24h.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

export default Contact
