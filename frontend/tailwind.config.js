/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Matrix Design System - Futuristic Theme
        matrix: {
          // Base colors
          dark: '#0a0a23',        // Deep space dark
          primary: '#00FFAA',     // Neon green (main)
          secondary: '#888EF0',   // Electric blue  
          tertiary: '#3C3C66',    // Deep blue
          accent: '#FF4081',      // Pink accent
          
          // Semantic colors
          success: '#00FF9F',     // Success green
          warning: '#FFD700',     // Gold warning
          error: '#FF4444',      // Error red
          info: '#00D4FF',       // Info cyan
          
          // Variants for accessibility
          'primary-light': '#33FFB8',   // Light mode variant
          'primary-dark': '#00CC88',    // Dark mode variant
          'secondary-light': '#A1A8F7', // Light mode blue
          'secondary-dark': '#6B75E0',  // Dark mode blue
        },
        
        // Keep essential Tailwind defaults (override only what's needed)
        blue: {
          500: '#3b82f6',         // Keep for compatibility
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gray: {
          50: '#f9fafb',          // Keep essential grays
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'monospace'],
        matrix: ['Orbitron', 'JetBrains Mono', 'monospace'], // Matrix futuristic font
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        // Core animations (optimized)
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        
        // Matrix theme animations
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'matrix-pulse': 'matrix-pulse 4s ease-in-out infinite',
        'matrix-flicker': 'matrix-flicker 2s ease-in-out infinite',
        'matrix-glow': 'matrix-glow 3s ease-in-out infinite alternate',
        'matrix-slide': 'matrix-slide 1s ease-out',
        'matrix-zoom': 'matrix-zoom 0.6s ease-out',
        
        // Performance optimized for mobile
        'matrix-rain-mobile': 'matrix-rain 30s linear infinite',
        'matrix-pulse-mobile': 'matrix-pulse 6s ease-in-out infinite',
      },
      keyframes: {
        // Legacy keyframes
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        // Matrix keyframes
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'matrix-pulse': {
          '0%, 100%': { 
            opacity: '0.4',
            transform: 'scale(1)',
            filter: 'brightness(1)',
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.05)',
            filter: 'brightness(1.2)',
          },
        },
        'matrix-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
          '51%': { opacity: '1' },
          '52%': { opacity: '0.3' },
          '53%': { opacity: '1' },
        },
        'matrix-scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'matrix-glow': {
          'from': { 
            'box-shadow': '0 0 5px #00FFAA, 0 0 10px #00FFAA, 0 0 15px #00FFAA',
            filter: 'brightness(1)',
          },
          'to': { 
            'box-shadow': '0 0 10px #00FFAA, 0 0 20px #00FFAA, 0 0 30px #00FFAA',
            filter: 'brightness(1.3)',
          },
        },
        'matrix-slide': {
          'from': { 
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          'to': { 
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'matrix-zoom': {
          'from': { 
            transform: 'scale(0.8)',
            opacity: '0',
          },
          'to': { 
            transform: 'scale(1)',
            opacity: '1',
          },
        },
      },
      backgroundImage: {
        'matrix-gradient': 'linear-gradient(135deg, #0a0a23 0%, #1a1a3a 25%, #2a2a4a 50%, #1a1a3a 75%, #0a0a23 100%)',
        'matrix-glow': 'radial-gradient(circle at center, rgba(0, 255, 170, 0.1) 0%, transparent 70%)',
        'matrix-scan': 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 170, 0.2) 50%, transparent 100%)',
      },
      boxShadow: {
        'matrix': '0 0 20px rgba(0, 255, 170, 0.3)',
        'matrix-lg': '0 0 40px rgba(0, 255, 170, 0.4), 0 0 80px rgba(0, 255, 170, 0.2)',
        'matrix-blue': '0 0 20px rgba(136, 142, 240, 0.3)',
        'matrix-blue-lg': '0 0 40px rgba(136, 142, 240, 0.4), 0 0 80px rgba(136, 142, 240, 0.2)',
      },
      backdropBlur: {
        'matrix': '12px',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
