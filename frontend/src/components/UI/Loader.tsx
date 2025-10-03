import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-dark-primary flex items-center justify-center z-50">
      <div className="relative">
        {/* Main loader */}
        <motion.div
          className="w-20 h-20 border-4 border-transparent rounded-full"
          style={{
            borderTopColor: '#00d9ff',
            borderRightColor: '#a855f7',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Inner loader */}
        <motion.div
          className="absolute inset-2 border-4 border-transparent rounded-full"
          style={{
            borderBottomColor: '#ec4899',
            borderLeftColor: '#22d3ee',
          }}
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full" />
        </motion.div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full filter blur-xl opacity-50" />
      </div>
      
      <motion.p
        className="absolute bottom-20 text-neon-blue font-display text-sm uppercase tracking-wider"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Loading...
      </motion.p>
    </div>
  )
}

export default Loader
