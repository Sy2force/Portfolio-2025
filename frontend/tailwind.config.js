/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        neon: {
          blue: '#00d9ff',
          purple: '#a855f7',
          pink: '#ec4899',
          green: '#22d3ee',
          yellow: '#facc15',
          orange: '#fb923c',
          cyan: '#06b6d4',
          magenta: '#d946ef',
        },
        dark: {
          primary: '#0a0a0f',
          secondary: '#1a1a2e',
          tertiary: '#16213e',
          card: 'rgba(255, 255, 255, 0.02)',
        }
      },
      fontFamily: {
        'display': ['Orbitron', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'holographic': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #feca57 75%, #ff6b6b 100%)',
        'neon-gradient': 'linear-gradient(135deg, #00d9ff 0%, #a855f7 50%, #ec4899 100%)',
        'cyber-grid': "linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'spin-slower': 'spin 30s linear infinite',
        'gradient': 'gradient 8s ease infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'glitch': 'glitch 1s linear infinite',
        'glitch-2': 'glitch-2 1s linear infinite',
        'text-reveal': 'text-reveal 0.5s ease forwards',
        'slide-in': 'slide-in 0.5s ease forwards',
        'fade-in': 'fade-in 0.5s ease forwards',
        'bounce-slow': 'bounce 3s infinite',
        'scan': 'scan 4s linear infinite',
        'flicker': 'flicker 2s linear infinite',
        'neon-pulse': 'neon-pulse 4s ease-in-out infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'holographic-shift': 'holographic-shift 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(0, 217, 255, 0.8), 0 0 60px rgba(0, 217, 255, 0.5)',
            transform: 'scale(1.02)',
          },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        glitch: {
          '0%, 100%': { 
            textShadow: '2px 2px 0 #ff00ff, -2px -2px 0 #00ffff',
            transform: 'translate(0)',
          },
          '20%': {
            textShadow: '2px 2px 0 #ff00ff, -2px -2px 0 #00ffff',
            transform: 'translate(-2px, 2px)',
          },
          '40%': {
            textShadow: '-2px -2px 0 #ff00ff, 2px 2px 0 #00ffff',
            transform: 'translate(-2px, -2px)',
          },
          '60%': {
            textShadow: '2px 2px 0 #ff00ff, -2px -2px 0 #00ffff',
            transform: 'translate(2px, -2px)',
          },
          '80%': {
            textShadow: '-2px -2px 0 #ff00ff, 2px 2px 0 #00ffff',
            transform: 'translate(2px, 2px)',
          },
        },
        'glitch-2': {
          '0%, 100%': { 
            transform: 'translate(0)',
            opacity: 1,
          },
          '20%': {
            transform: 'translate(-2px, 2px)',
            opacity: 0.8,
          },
          '40%': {
            transform: 'translate(-2px, -2px)',
            opacity: 1,
          },
          '60%': {
            transform: 'translate(2px, 2px)',
            opacity: 0.8,
          },
          '80%': {
            transform: 'translate(2px, -2px)',
            opacity: 1,
          },
        },
        'text-reveal': {
          '0%': { 
            opacity: 0,
            transform: 'translateY(20px)',
          },
          '100%': { 
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        'slide-in': {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: 0,
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '10%, 30%, 50%, 70%, 90%': { opacity: 0.8 },
          '20%, 40%, 60%, 80%': { opacity: 1 },
        },
        'neon-pulse': {
          '0%, 100%': { 
            textShadow: '0 0 5px #00d9ff, 0 0 10px #00d9ff, 0 0 20px #00d9ff, 0 0 40px #00d9ff',
          },
          '50%': { 
            textShadow: '0 0 10px #00d9ff, 0 0 20px #00d9ff, 0 0 30px #00d9ff, 0 0 50px #00d9ff',
          },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'holographic-shift': {
          '0%, 100%': { 
            filter: 'hue-rotate(0deg)',
            transform: 'rotateY(0deg)',
          },
          '50%': { 
            filter: 'hue-rotate(180deg)',
            transform: 'rotateY(10deg)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3)',
        'neon-purple': '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
        'neon-pink': '0 0 20px rgba(236, 72, 153, 0.5), 0 0 40px rgba(236, 72, 153, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'holographic': '0 0 30px rgba(0, 217, 255, 0.4), 0 0 60px rgba(168, 85, 247, 0.3), 0 0 90px rgba(236, 72, 153, 0.2)',
      },
    },
  },
  plugins: [],
}
