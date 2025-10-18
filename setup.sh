#!/bin/bash

echo "🚀 Création du Portfolio Shay complet..."

# Créer structure
mkdir -p frontend/src/{components,pages,styles,utils,locales}
mkdir -p backend/src/{controllers,routes,models,config,middleware}

# Package.json racine
cat > package.json << 'EOF'
{
  "name": "portfolio-shay",
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "install:all": "cd frontend && npm install && cd ../backend && npm install"
  },
  "devDependencies": {
    "concurrently": "^7.6.0"
  }
}
EOF

# Frontend package.json
cat > frontend/package.json << 'EOF'
{
  "name": "portfolio-frontend",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "framer-motion": "^10.16.16",
    "react-i18next": "^13.5.0",
    "i18next": "^23.7.6",
    "axios": "^1.6.2",
    "react-hook-form": "^7.48.2",
    "react-hot-toast": "^2.4.1",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.37",
    "@types/react-dom": "^18.2.15",
    "@vitejs/plugin-react": "^4.1.1",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.2.2",
    "vite": "^5.0.0"
  }
}
EOF

# Backend package.json
cat > backend/package.json << 'EOF'
{
  "name": "portfolio-backend",
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.5",
    "nodemon": "^3.0.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  }
}
EOF

echo "✅ Structure créée ! Installez avec: npm run install:all"
