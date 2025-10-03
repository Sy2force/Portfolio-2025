import { motion } from 'framer-motion'

interface GlitchTextProps {
  text: string
  className?: string
}

const GlitchText = ({ text, className = '' }: GlitchTextProps) => {
  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 text-neon-blue opacity-70"
        animate={{
          x: [-2, 2, -2, 0],
          y: [2, -2, 2, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 2,
        }}
        aria-hidden
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-neon-pink opacity-70"
        animate={{
          x: [2, -2, 2, 0],
          y: [-2, 2, -2, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 2,
          delay: 0.1,
        }}
        aria-hidden
      >
        {text}
      </motion.span>
    </div>
  )
}

export default GlitchText
