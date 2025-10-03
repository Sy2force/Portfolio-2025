import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaWhatsapp, FaLinkedin } from 'react-icons/fa'

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-pink/20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Title */}
          <motion.h2
            className="text-4xl md:text-6xl font-display font-bold mb-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-white">Prêt à </span>
            <span className="text-gradient">Collaborer</span>
            <span className="text-white"> ?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Transformons vos idées en réalité digitale. 
            Contactez-moi pour discuter de votre prochain projet innovant.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link to="/contact">
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg font-display font-semibold uppercase tracking-wider overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  <FaEnvelope />
                  Commencer un Projet
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-pink"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>

            <motion.button
              className="group relative px-8 py-4 border-2 border-white/20 rounded-lg font-display font-semibold uppercase tracking-wider overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://calendly.com', '_blank')}
            >
              <span className="relative z-10 text-white">
                Planifier un Appel
              </span>
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          {/* Quick Contact Options */}
          <motion.div
            className="flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <FaWhatsapp size={20} />
              <span className="text-sm font-mono">WhatsApp</span>
            </motion.a>

            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <FaLinkedin size={20} />
              <span className="text-sm font-mono">LinkedIn</span>
            </motion.a>

            <motion.a
              href="mailto:contact@example.com"
              className="flex items-center gap-2 text-gray-400 hover:text-neon-pink transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <FaEnvelope size={20} />
              <span className="text-sm font-mono">Email</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 border border-neon-blue/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 border border-neon-purple/30"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </section>
  )
}

export default CTASection
