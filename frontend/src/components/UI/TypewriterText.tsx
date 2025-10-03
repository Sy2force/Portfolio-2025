import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypewriterTextProps {
  texts: string[]
  delay?: number
  speed?: number
}

const TypewriterText = ({ texts, delay = 2000, speed = 100 }: TypewriterTextProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex]

      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1))

        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), delay)
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1))

        if (currentText === '') {
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, texts, delay, speed])

  return (
    <span className="inline-flex items-center">
      <span>{currentText}</span>
      <motion.span
        className="inline-block w-0.5 h-6 bg-neon-blue ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </span>
  )
}

export default TypewriterText
