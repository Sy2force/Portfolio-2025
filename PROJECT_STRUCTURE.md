# 📁 Structure du Projet Portfolio

```
portfolio/
├── frontend/                 # Application React
│   ├── src/                 # Code source React
│   │   ├── components/      # Composants React
│   │   │   ├── Background/  # Composants de fond
│   │   │   ├── Home/       # Composants page accueil
│   │   │   ├── Layout/     # Navbar, Footer
│   │   │   └── UI/         # Composants UI réutilisables
│   │   ├── hooks/          # React hooks personnalisés
│   │   ├── pages/          # Pages de l'application
│   │   ├── services/       # Services API
│   │   ├── utils/          # Fonctions utilitaires
│   │   ├── App.tsx         # Composant principal
│   │   ├── main.tsx        # Point d'entrée
│   │   └── index.css       # Styles globaux
│   ├── public/             # Assets publics  
│   │   ├── manifest.json   # PWA manifest
│   │   ├── sw.js          # Service Worker
│   │   ├── robots.txt     # SEO robots
│   │   └── sitemap.xml    # Sitemap
│   ├── index.html         # Point d'entrée HTML
│   ├── package.json       # Dépendances frontend
│   ├── vite.config.ts     # Config Vite
│   ├── tailwind.config.js # Config Tailwind
│   ├── tsconfig.json      # Config TypeScript
│   ├── vercel.json        # Config Vercel
│   ├── nginx.conf         # Config Nginx
│   └── Dockerfile         # Docker frontend
│
├── backend/                # API Node.js
│   ├── src/               # Code source backend
│   │   ├── models/        # Modèles MongoDB/Prisma
│   │   ├── routes/        # Routes API
│   │   ├── middleware/    # Middleware Express
│   │   ├── utils/         # Fonctions utilitaires
│   │   └── server.ts      # Serveur principal
│   ├── prisma/            # Schéma BDD
│   │   └── schema.prisma  # Définition des modèles
│   ├── uploads/           # Fichiers uploadés
│   │   └── .gitkeep       # Garde le dossier
│   ├── package.json       # Dépendances backend
│   ├── tsconfig.json      # Config TypeScript
│   ├── nodemon.json       # Config Nodemon
│   ├── .env.example       # Variables d'environnement
│   ├── mongo-init.js      # Script init MongoDB
│   └── Dockerfile         # Docker backend
│
├── package.json           # Scripts monorepo
├── docker-compose.yml     # Orchestration Docker
├── start.sh              # Script de démarrage
├── .gitignore            # Fichiers ignorés Git
├── .dockerignore         # Fichiers ignorés Docker
├── .env.example          # Variables d'environnement
├── README.md             # Documentation principale
├── README.deployment.md  # Guide de déploiement
└── PROJECT_STRUCTURE.md  # Ce fichier
```

## 🚀 Commandes Rapides

### Développement
```bash
# Depuis la racine (lance tout)
npm run dev

# Frontend uniquement
cd frontend && npm run dev

# Backend uniquement  
cd backend && npm run dev
```

### Production
```bash
# Build complet
npm run build

# Docker
docker-compose up -d
```

## 🔗 URLs

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **API**: http://localhost:5000/api
- **Health**: http://localhost:5000/health

## ✅ État du Projet

- ✅ Structure monorepo clean
- ✅ Frontend React + Vite + TypeScript
- ✅ Backend Node.js + Express + TypeScript  
- ✅ Docker configuré
- ✅ Scripts de démarrage
- ✅ PWA support
- ✅ SEO optimisé
- ✅ Design futuriste
