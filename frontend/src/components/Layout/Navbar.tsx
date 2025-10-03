import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const navItems = [
  { name: 'Accueil', path: '/', glow: 'from-neon-blue to-neon-cyan' },
  { name: 'À Propos', path: '/about', glow: 'from-neon-purple to-neon-magenta' },
  { name: 'Compétences', path: '/skills', glow: 'from-neon-green to-neon-blue' },
  { name: 'Projets', path: '/projects', glow: 'from-neon-pink to-neon-purple' },
  { name: 'Services', path: '/services', glow: 'from-neon-orange to-neon-yellow' },
  { name: 'CV', path: '/cv', glow: 'from-neon-cyan to-neon-green' },
  { name: 'Contact', path: '/contact', glow: 'from-neon-magenta to-neon-pink' },
]

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/shayacoca', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/shayacoca', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com/shayacoca', label: 'Twitter' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark-primary/80 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative group">
            <motion.div 
              className="text-2xl font-display font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative">
                PORTFOLIO
                <motion.span
                  className="absolute inset-0 text-neon-blue blur-lg opacity-50"
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  PORTFOLIO
                </motion.span>
              </span>
            </motion.div>
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="relative group"
                  >
                    <motion.span
                      className={`relative z-10 font-display font-medium text-sm uppercase tracking-wider transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'text-neon-blue'
                          : 'text-gray-300 hover:text-white'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.span>
                    
                    {/* Hover effect */}
                    <motion.div
                      className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r ${item.glow}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: location.pathname === item.path ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Glow effect */}
                    {location.pathname === item.path && (
                      <motion.div
                        className={`absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-r ${item.glow} blur-md opacity-50`}
                        layoutId="navGlow"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/10">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg opacity-20" />
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiX size={24} className="text-neon-blue" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiMenu size={24} className="text-neon-blue" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 overflow-hidden"
            >
              <motion.ul 
                className="flex flex-col gap-2 py-4"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.05 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                {navItems.map((item) => (
                  <motion.li
                    key={item.path}
                    variants={{
                      open: { x: 0, opacity: 1 },
                      closed: { x: -20, opacity: 0 }
                    }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 px-4 rounded-lg transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-neon-blue'
                          : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="font-display font-medium text-sm uppercase tracking-wider">
                        {item.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Mobile Social Links */}
              <motion.div 
                className="flex items-center justify-center gap-4 py-4 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-neon-blue transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar
