import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaDownload, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import TypewriterText from '../UI/TypewriterText';
import GlitchText from '../UI/GlitchText';
import { profileData } from '../../data/profile';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    // Matrix rain effect
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}'.split('')
    const fontSize = 10
    const columns = canvas.width / fontSize
    const drops: number[] = []
    
    for (let x = 0; x < columns; x++) {
      drops[x] = 1
    }
    
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#00d9ff'
      ctx.font = fontSize + 'px monospace'
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }
    
    const interval = setInterval(draw, 35)
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Matrix Rain Background */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 opacity-20"
        style={{ zIndex: 0 }}
      />
      
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 border border-neon-blue/20 rounded-full"
          style={{
            top: '10%',
            left: '10%',
            x: mousePos.x * 0.02,
            y: mousePos.y * 0.02,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        />
        <motion.div
          className="absolute w-96 h-96 border border-neon-purple/20"
          style={{
            bottom: '10%',
            right: '10%',
            x: mousePos.x * -0.03,
            y: mousePos.y * -0.03,
            transform: 'rotate(45deg)',
          }}
          animate={{
            rotate: -360,
          }}
          transition={{
            rotate: {
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        />
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Welcome Text */}
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neon-blue font-mono text-sm md:text-base mb-4 uppercase tracking-widest"
          >
            {'<'} Welcome to the Future {'/'}
          </motion.p>
          
          {/* Main Title */}
          <motion.h1
            className="relative mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="text-5xl md:text-7xl lg:text-8xl font-display font-bold">
              <GlitchText text="SHAY" className="text-white" />
              <span className="text-gradient ml-4">ACOCA</span>
            </div>
          </motion.h1>
          
          {/* Dynamic Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 font-mono"
          >
            <TypewriterText
              texts={[
                'Digital Marketer & Full-Stack Developer',
                'React & Node.js Expert',
                'UI/UX Designer',
                'Creative Problem Solver',
                'Tech Innovator',
              ]}
            />
          </motion.div>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-gray-400 max-w-2xl mx-auto mb-8 text-lg leading-relaxed"
          >
            {profileData.headline}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
          >
            {[
              { label: 'Années d\'expérience', value: profileData.stats.yearsExperience + '+', icon: '📈' },
              { label: 'Projets réalisés', value: profileData.stats.completedProjects + '+', icon: '🚀' },
              { label: 'Clients satisfaits', value: profileData.stats.happyClients + '+', icon: '😊' },
              { label: 'Stack maîtrisées', value: '15+', icon: '💻' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 217, 255, 0.5)' }}
                className="p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 transition-all"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <Link to="/projects">
              <motion.button
                className="relative px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-white font-semibold overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  🚀 Voir mes projets
                </span>
              </motion.button>
            </Link>
            
            <Link to="/cv">
              <motion.button
                className="relative px-8 py-4 border-2 border-neon-blue rounded-full text-white font-semibold overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2 text-neon-blue group-hover:text-white transition-colors duration-300">
                  <FaDownload className="group-hover:animate-bounce" />
                  Télécharger CV
                </span>
                <motion.div
                  className="absolute inset-0 bg-neon-blue"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.button>
            </Link>

            <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer">
              <motion.button
                className="relative px-8 py-4 border-2 border-neon-purple rounded-full text-white font-semibold overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2 text-neon-purple group-hover:text-white transition-colors duration-300">
                  <FaGithub />
                  GitHub
                </span>
                <motion.div
                  className="absolute inset-0 bg-neon-purple"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.button>
            </a>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-6 h-10 border-2 border-neon-blue/50 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-2 bg-neon-blue rounded-full mt-2"
                animate={{
                  y: [0, 16, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* HUD Frame */}
      <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-neon-blue/30" />
      <div className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-neon-blue/30" />
      <div className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-neon-blue/30" />
      <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-neon-blue/30" />
    </section>
  )
}

export default HeroSection
