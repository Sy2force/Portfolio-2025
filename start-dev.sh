#!/bin/bash

echo "🚀 Démarrage du Portfolio Full Stack Professionnel..."

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ️${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

# Vérifier les variables d'environnement
print_info "Vérification de la configuration..."
    echo "⚙️ Création du fichier .env.local frontend..."
    cp frontend/.env.example frontend/.env.local
fi

if [ ! -f "backend/.env" ]; then
    echo "⚙️ Création du fichier .env backend..."
    cp backend/.env.example backend/.env
fi

echo ""
echo "✅ Configuration terminée !"
echo ""
echo "🌐 URLs de développement :"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "🚀 Démarrage des serveurs..."

# Démarrer les deux serveurs en parallèle
npm run dev
