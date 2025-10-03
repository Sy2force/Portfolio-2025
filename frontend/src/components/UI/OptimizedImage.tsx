import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  onLoad?: () => void
  placeholder?: 'blur' | 'empty'
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  onLoad,
  placeholder = 'blur',
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imgRef.current || priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0, rootMargin: '50px' }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const shouldLoad = priority || isInView

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse"
          style={{ filter: 'blur(20px)' }}
        />
      )}
      
      {/* Main Image */}
      <motion.img
        ref={imgRef}
        src={shouldLoad ? src : undefined}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.1
        }}
        transition={{ duration: 0.4 }}
        className={`w-full h-full object-cover ${!isLoaded ? 'invisible' : ''}`}
      />
      
      {/* Loading shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]">
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      )}
    </div>
  )
}

export default OptimizedImage
