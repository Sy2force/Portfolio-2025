#!/bin/bash

# Script de migration vers la nouvelle architecture
# Shay Acoca Portfolio - 2024

echo "🚀 Migration du portfolio vers l'architecture moderne..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérification des prérequis
echo "📋 Vérification des prérequis..."

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prérequis vérifiés${NC}"

# Sauvegarde de l'ancienne structure
echo "💾 Sauvegarde de l'ancienne structure..."
if [ ! -d "backup" ]; then
    mkdir -p backup
    cp -r frontend/pages backup/pages_old
    cp -r frontend/src backup/src_old
    echo -e "${GREEN}✅ Sauvegarde créée dans ./backup${NC}"
else
    echo -e "${YELLOW}⚠️  Un dossier de sauvegarde existe déjà${NC}"
fi

# Installation des nouvelles dépendances
echo "📦 Installation des nouvelles dépendances..."
cd frontend

# Dépendances principales
npm install --save \
  next@14 \
  react@18 \
  react-dom@18 \
  typescript@5 \
  @types/react@18 \
  @types/react-dom@18 \
  @types/node@20

# UI et animations
npm install --save \
  framer-motion@10 \
  @heroicons/react@2 \
  clsx \
  tailwind-merge

# Formulaires et validation
npm install --save \
  react-hook-form@7 \
  @hookform/resolvers \
  zod

# Utilitaires
npm install --save \
  axios \
  date-fns \
  zustand

# Dépendances de développement
npm install --save-dev \
  @tailwindcss/forms \
  @tailwindcss/typography \
  @tailwindcss/aspect-ratio \
  eslint-config-next \
  prettier \
  prettier-plugin-tailwindcss

echo -e "${GREEN}✅ Dépendances installées${NC}"

# Configuration TypeScript pour App Router
echo "⚙️  Configuration de TypeScript..."
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/styles/*": ["./src/styles/*"],
      "@/types/*": ["./src/types/*"],
      "@/app/*": ["./src/app/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
EOF
echo -e "${GREEN}✅ TypeScript configuré${NC}"

# Configuration Next.js optimisée
echo "⚙️  Configuration de Next.js..."
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['localhost', 'cdn.shayacoca.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
  },
  
  experimental: {
    optimizeCss: true,
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },
  
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
EOF
echo -e "${GREEN}✅ Next.js configuré${NC}"

# Configuration Tailwind CSS
echo "⚙️  Configuration de Tailwind CSS..."
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
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
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
EOF
echo -e "${GREEN}✅ Tailwind CSS configuré${NC}"

# Mise à jour du package.json
echo "📝 Mise à jour du package.json..."
cat > package.json << 'EOF'
{
  "name": "portfolio-frontend",
  "version": "2.0.0",
  "description": "Portfolio professionnel de Shay Acoca - Architecture moderne 2024",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "analyze": "ANALYZE=true next build",
    "clean": "rm -rf .next node_modules",
    "reinstall": "npm run clean && npm install"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/node": "^20.0.0",
    "framer-motion": "^10.0.0",
    "@heroicons/react": "^2.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "react-hook-form": "^7.0.0",
    "@hookform/resolvers": "^3.0.0",
    "zod": "^3.0.0",
    "axios": "^1.0.0",
    "date-fns": "^2.0.0",
    "zustand": "^4.0.0"
  },
  "devDependencies": {
    "@tailwindcss/forms": "^0.5.0",
    "@tailwindcss/typography": "^0.5.0",
    "@tailwindcss/aspect-ratio": "^0.4.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.0",
    "prettier-plugin-tailwindcss": "^0.5.0",
    "@types/jest": "^29.0.0",
    "jest": "^29.0.0",
    "jest-environment-jsdom": "^29.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0"
  }
}
EOF
echo -e "${GREEN}✅ Package.json mis à jour${NC}"

# Variables d'environnement
echo "🔐 Création du fichier .env.local..."
cat > .env.local << 'EOF'
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=

# Features flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_CONTACT_FORM=true
EOF
echo -e "${GREEN}✅ Variables d'environnement configurées${NC}"

# Installation finale
echo "📦 Installation finale des dépendances..."
npm install

# Build de test
echo "🔨 Test de build..."
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✨ Migration réussie !${NC}"
    echo ""
    echo "📋 Prochaines étapes :"
    echo "1. Vérifiez la nouvelle structure dans src/app"
    echo "2. Testez l'application : npm run dev"
    echo "3. Consultez le README_NEW.md pour la documentation"
    echo ""
    echo -e "${GREEN}🚀 Votre portfolio est maintenant moderne et optimisé !${NC}"
else
    echo -e "${RED}❌ Erreur lors du build. Vérifiez les logs ci-dessus.${NC}"
    exit 1
fi
EOF
chmod +x migrate.sh
