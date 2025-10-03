# 🚀 Portfolio Full-Stack 2025 - Shay Acoca

[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel%20%2B%20Render-000000)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> 🎨 **Portfolio professionnel moderne** avec interface futuriste glassmorphisme, animations Framer Motion, multilingue (FR/EN/HE), dashboard admin complet, et architecture scalable.

🔗 **Demo Live**: [portfolio-2025.vercel.app](https://portfolio-2025.vercel.app)  
📦 **Repository**: [github.com/Sy2force/Portfolio-2025](https://github.com/Sy2force/Portfolio-2025)

## 📋 Table des matières

- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Stack Technique](#️-stack-technique)
- [📁 Architecture](#-architecture)
- [⚡ Installation](#-installation)
- [📦 Scripts](#-scripts)
- [🔐 Variables d'environnement](#-variables-denvironnement)
- [🚀 Déploiement](#-déploiement)
- [🧪 Tests](#-tests)
- [📊 Performance](#-performance)
- [🤝 Contribution](#-contribution)

## ✨ Fonctionnalités

### 🎯 Interface Publique
- **Design Futuriste** - Glassmorphisme, néon, animations fluides
- **Pages Complètes** - Home, About, Skills, Projects, Services, CV, Contact
- **Multilingue** - FR/EN/HE avec détection automatique
- **Dark/Light Mode** - Thème adaptatif avec persistance
- **Responsive** - Mobile-first, optimisé tous écrans
- **PWA Ready** - Installable, offline-first
- **SEO Optimisé** - Meta tags dynamiques, sitemap, robots.txt

### 🔐 Dashboard Admin
- **Auth Sécurisée** - JWT + Refresh tokens
- **CRUD Projets** - Gestion complète portfolio
- **Upload Files** - Images, CV avec preview
- **Analytics** - Stats visiteurs, conversions
- **Notifications** - Système temps réel
- **Profile Editor** - Mise à jour live

## 🛠️ Stack Technique

### Frontend
- **React 18.2** - UI Library
- **TypeScript 5.2** - Type safety
- **Vite 5.0** - Build tool ultra-rapide
- **Tailwind CSS 3.4** - Utility-first CSS
- **Framer Motion 10** - Animations avancées
- **Three.js** - Graphiques 3D
- **React Router 6** - Navigation SPA
- **i18next** - Internationalisation
- **Axios** - HTTP client
- **React Hook Form** - Gestion formulaires

### Backend
- **Node.js 18+** - Runtime JavaScript
- **Express 4** - Framework web
- **TypeScript** - Type safety
- **MongoDB 7** - Base de données NoSQL
- **Mongoose** - ODM MongoDB
- **JWT** - Authentication tokens
- **Bcrypt** - Hash passwords
- **Multer** - Upload files
- **Nodemailer** - Email service
- **Express Rate Limit** - Protection API

### DevOps
- **Docker** - Containerisation
- **Docker Compose** - Orchestration
- **GitHub Actions** - CI/CD
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Database cloud

## 📁 Architecture

```
Portfolio-2025/
├── frontend/                    # Application React
│   ├── src/
│   │   ├── components/         # Composants réutilisables
│   │   ├── pages/             # Pages de l'application
│   │   ├── contexts/          # Context API
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # API calls
│   │   ├── utils/             # Utilitaires
│   │   └── i18n/              # Traductions
│   ├── public/                # Assets statiques
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── backend/                    # API REST
│   ├── src/
│   │   ├── routes/            # Endpoints API
│   │   ├── models/            # Modèles MongoDB
│   │   ├── middleware/        # Middlewares Express
│   │   ├── utils/             # Helpers
│   │   └── server.ts          # Point d'entrée
│   ├── uploads/               # Fichiers uploadés
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml          # Stack Docker
├── render.yaml                 # Config Render
└── README.md                   # Documentation
```

## ⚡ Installation

### Prérequis
- Node.js 18+ et npm 9+
- MongoDB 7+ (local ou Atlas)
- Git

### Installation complète

```bash
# 1. Cloner le repository
git clone https://github.com/Sy2force/Portfolio-2025.git
cd Portfolio-2025

# 2. Installer les dépendances
npm run install:all

# 3. Configuration environnement
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
# Éditer les fichiers .env avec vos valeurs

# 4. Démarrer en développement
npm run dev
```

### Avec Docker

```bash
# Build et démarrer tous les services
docker-compose up -d

# Services disponibles:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:5000
# - MongoDB: localhost:27017
```

## 📦 Scripts

### 🔧 Scripts Racine (Monorepo)
```bash
npm run dev          # Lance frontend + backend simultanément
npm run build        # Build frontend et backend
npm run start        # Mode production complet
npm run install:all  # Installe toutes les dépendances
npm run docker:up    # Lance avec Docker
npm run docker:down  # Arrête Docker
npm run clean        # Nettoie node_modules et builds
```

### ⚛️ Scripts Frontend
```bash
cd frontend
npm run dev          # Dev server (http://localhost:5173)
npm run build        # Build production
npm run preview      # Preview du build
npm run lint         # Vérifie le code
npm run deploy       # Deploy sur Vercel
```

### 🔌 Scripts Backend  
```bash
cd backend
npm run dev          # Dev avec nodemon (http://localhost:5000)
npm run build        # Compile TypeScript
npm run start        # Production server
```


## 🔐 Variables d'environnement

### Frontend (.env)
```env
# API
VITE_API_URL=http://localhost:5000/api

# EmailJS
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=public_key_xxxxx

# Analytics (optionnel)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Backend (.env)
```env
# Server
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# JWT
JWT_SECRET=your-super-secret-key-change-this
JWT_REFRESH_SECRET=your-refresh-secret-key

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin
ADMIN_EMAIL=admin@shayacoca.com

# Uploads
UPLOAD_DIR=./uploads

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:5173
```

## 🚀 Déploiement

### Frontend - Vercel

1. **Via CLI**
```bash
cd frontend
npm run build
vercel --prod
```

2. **Via GitHub**
- Connecter repo sur [vercel.com](https://vercel.com)
- Config auto-détectée
- Deploy automatique sur push

### Backend - Render

1. **Configuration render.yaml**
```yaml
services:
  - type: web
    name: portfolio-backend
    env: node
    buildCommand: cd backend && npm install && npm run build
    startCommand: cd backend && npm start
```

2. **Deploy**
- Connecter sur [render.com](https://render.com)
- Ajouter variables d'environnement
- Deploy automatique

### Database - MongoDB Atlas
- Cluster gratuit disponible
- Backup automatique
- Monitoring inclus

## 🧪 Tests

```bash
# Frontend tests
cd frontend
npm run test        # Unit tests
npm run test:e2e    # Tests E2E

# Backend tests
cd backend
npm run test        # API tests
```

## 📊 Performance

### Métriques
- **Lighthouse Score**: 98+/100
- **Bundle Size**: 186KB gzippé
- **Build Time**: ~15-20s
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s

### Optimisations
- Code splitting automatique
- Lazy loading routes
- Images optimisées (WebP)
- Compression Gzip/Brotli
- CDN pour assets
- Cache browser agressif
- Service Worker (PWA)

## 🔒 Sécurité

- **Authentication** - JWT + Refresh tokens
- **Encryption** - Bcrypt pour passwords
- **Rate Limiting** - Protection brute force
- **CORS** - Origines autorisées uniquement
- **Helmet** - Headers sécurité
- **Validation** - Joi schemas
- **XSS Protection** - Input sanitization
- **File Upload** - Types et tailles limités

## 📚 Documentation API

### Routes principales

| Méthode | Endpoint | Description | Auth |
|---------|----------|-------------|------|
| GET | `/api/projects` | Liste projets publics | ❌ |
| GET | `/api/projects/:id` | Détail projet | ❌ |
| POST | `/api/projects` | Créer projet | ✅ |
| PUT | `/api/projects/:id` | Modifier projet | ✅ |
| DELETE | `/api/projects/:id` | Supprimer projet | ✅ |
| POST | `/api/contact` | Envoyer message | ❌ |
| POST | `/api/auth/login` | Connexion admin | ❌ |
| GET | `/api/profile` | Info publique | ❌ |
| PUT | `/api/profile` | Màj profil | ✅ |

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 🐛 Problèmes connus

- Hot reload Vite parfois instable
- Upload images > 5MB peut timeout
- Cache browser agressif nécessite hard refresh

## 📅 Roadmap

- [ ] Blog intégré avec MDX
- [ ] Commentaires sur projets
- [ ] Chat support live
- [ ] Export PDF du CV personnalisé
- [ ] Mode offline complet (PWA)
- [ ] Tests E2E Cypress

## 📝 License

MIT License - voir [LICENSE](LICENSE)

## 👨‍💻 Auteur

**Shay Acoca**
- 🌐 Website: [shayacoca.com](https://shayacoca.com)
- 📧 Email: shay.acoca@example.com
- 💼 LinkedIn: [/in/shayacoca](https://linkedin.com/in/shayacoca)
- 🐙 GitHub: [@Sy2force](https://github.com/Sy2force)

---

<div align="center">

⭐ **Star ce projet si vous l'aimez!**

🚀 **Built with passion by Shay Acoca**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Sy2force/Portfolio-2025)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/shayacoca)

</div>
