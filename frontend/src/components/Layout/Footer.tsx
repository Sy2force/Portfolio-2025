import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart, FaCode } from 'react-icons/fa'
import { SiReact, SiTypescript, SiTailwindcss, SiNodedotjs } from 'react-icons/si'

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/shayacoca', label: 'GitHub', color: 'hover:text-gray-400' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/shayacoca', label: 'LinkedIn', color: 'hover:text-blue-500' },
  { icon: FaTwitter, href: 'https://twitter.com/shayacoca', label: 'Twitter', color: 'hover:text-sky-400' },
  { icon: FaEnvelope, href: 'mailto:shay.acoca@example.com', label: 'Email', color: 'hover:text-neon-pink' },
]

const techStack = [
  { icon: SiReact, label: 'React', color: 'text-cyan-400' },
  { icon: SiTypescript, label: 'TypeScript', color: 'text-blue-400' },
  { icon: SiTailwindcss, label: 'Tailwind', color: 'text-teal-400' },
  { icon: SiNodedotjs, label: 'Node.js', color: 'text-green-400' },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-20 border-t border-white/10 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-secondary/50" />
      
      {/* Holographic Effect */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            'linear-gradient(45deg, #00d9ff 0%, transparent 50%, #a855f7 100%)',
            'linear-gradient(45deg, #a855f7 0%, transparent 50%, #ec4899 100%)',
            'linear-gradient(45deg, #ec4899 0%, transparent 50%, #00d9ff 100%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-display font-bold text-gradient">
              PORTFOLIO
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Digital Marketer & Full-Stack Developer passionné par la création d'expériences web innovantes et futuristes.
            </p>
            <div className="flex gap-3">
              {techStack.map((tech) => (
                <motion.div
                  key={tech.label}
                  className={`${tech.color} transition-all duration-300`}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  title={tech.label}
                >
                  <tech.icon size={24} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-display font-semibold text-neon-blue">
              Navigation Rapide
            </h3>
            <ul className="space-y-2">
              {['Projets', 'Services', 'CV', 'Contact'].map((item) => (
                <li key={item}>
                  <motion.a
                    href={`/${item.toLowerCase()}`}
                    className="group flex items-center gap-2 text-gray-400 hover:text-neon-purple transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-neon-blue group-hover:text-neon-purple transition-colors duration-300">
                      ▸
                    </span>
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-display font-semibold text-neon-purple">
              Restons Connectés
            </h3>
            <p className="text-gray-400 text-sm">
              Suivez-moi sur les réseaux sociaux pour découvrir mes derniers projets.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative group ${social.color}`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  <social.icon size={24} className="relative z-10 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="my-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center space-y-2"
        >
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            <FaCode className="text-neon-blue" />
            Crafted with
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <FaHeart className="text-neon-pink" />
            </motion.span>
            by <span className="text-gradient font-semibold">Shay Acoca</span>
          </p>
          <p className="text-gray-500 text-xs">
            © {currentYear} All rights reserved. Built with React, TypeScript & Tailwind CSS
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-blue/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-neon-purple/10 rounded-full filter blur-3xl" />
      </div>
    </footer>
  )
}

export default Footer
