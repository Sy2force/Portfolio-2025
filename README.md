# 🚀 Portfolio Full-Stack Shay Acoca

> **Expert Marketing Digital & Développeur Full-Stack**  
> Portfolio professionnel moderne avec Next.js 14 et Express.js

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/sy2force)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)](https://www.mongodb.com/)

## 📋 Table des Matières
- [Vue d'ensemble](#-vue-densemble)
- [Stack Technique](#️-stack-technique)
- [Installation](#-installation-rapide)
- [Structure](#-structure-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Scripts](#-scripts-disponibles)
- [Configuration](#-configuration)
- [Déploiement](#-déploiement)
- [Contact](#-contact)

## 🎯 Vue d'ensemble

Portfolio professionnel complet présentant les compétences et projets de **Shay Acoca**, expert en marketing digital et développeur full-stack basé à Jérusalem & Tel Aviv, Israël.

```
Portfolio-Shay/
├── frontend/          # Application Next.js
│   ├── app/           # Pages et layouts (App Router)
│   ├── components/    # Composants React réutilisables
│   ├── lib/          # Utilitaires et configuration
│   └── public/       # Assets statiques
├── backend/          # API Express.js
│   ├── src/
│   │   ├── controllers/  # Contrôleurs
│   │   ├── models/      # Modèles Mongoose
│   │   ├── routes/      # Routes API
│   │   └── middleware/  # Middlewares
└── docs/            # Documentation
```

## 🛠️ Installation et développement

### Prérequis
- Node.js 18+
- MongoDB
- npm ou yarn

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/Portfolio-Shay.git
cd Portfolio-Shay
```

2. **Installer les dépendances**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. **Configuration des variables d'environnement**
```bash
# Frontend
cp frontend/.env.example frontend/.env.local

# Backend
cp backend/.env.example backend/.env
```

4. **Démarrer en mode développement**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
│   │   ├── Footer.tsx            # Pied de page
│   │   ├── HeroComplete.tsx      # Section hero
│   │   └── ProjectsComplete.tsx  # Grille projets
│   ├── 📚 lib/                    # Utilitaires & données
│   │   ├── real-projects-data.ts # Données projets
│   │   ├── cv-data.ts            # Données CV
│   │   └── projects-types.ts     # Types TypeScript
│   ├── 🎨 styles/                 # Styles CSS
│   └── 🌐 public/                 # Assets statiques
├── ⚙️ backend/                     # API Express.js
│   └── src/
│       ├── 🎮 controllers/        # Contrôleurs API
│       ├── 🛡️ middleware/          # Middlewares
│       ├── 📊 models/             # Modèles MongoDB
│       ├── 🛣️ routes/              # Routes API
│       └── ⚙️ config/              # Configuration
├── 🐳 docker-compose.yml          # Orchestration Docker
├── 🚀 deploy.sh                   # Script déploiement
├── 📦 setup.sh                    # Script installation
└── 🔧 start-dev.sh               # Script développement
```

## ✨ Fonctionnalités

### 📱 Pages Principales
| Page | Description | Fonctionnalités |
|------|-------------|-----------------|
| 🏠 **Accueil** | Landing page avec hero section | Animations, statistiques, CTA |
| 👤 **À Propos** | Parcours professionnel | Timeline, compétences, certifications |
| 💼 **Projets** | Portfolio avec filtres | Grille responsive, modal détails |
| 🛍️ **Services** | Offres et tarifs | Packages, pricing, comparaison |
| 📞 **Contact** | Formulaire fonctionnel | Validation, envoi email, social links |
| 📄 **CV** | Téléchargement PDF | Version imprimable, données réelles |
| 🔐 **Admin** | Panel d'administration | Auth JWT, gestion projets, analytics |

### 🔧 Fonctionnalités Techniques
- ✅ **Responsive Design**: Mobile-first, tous écrans
- ✅ **SEO Optimisé**: Meta tags, sitemap, robots.txt, Open Graph
- ✅ **Multilingue**: Français, English, עברית avec react-i18next
- ✅ **Mode Sombre/Clair**: Toggle theme avec persistance
- ✅ **Animations**: Framer Motion pour UX fluide
- ✅ **API REST**: Endpoints complets avec validation
- ✅ **Authentification**: JWT sécurisé avec refresh tokens
- ✅ **Validation**: Joi pour backend, Zod pour frontend
- ✅ **Rate Limiting**: Protection contre spam/DDoS
- ✅ **CORS**: Configuration sécurisée cross-origin

## 📜 Scripts Disponibles

### 🎨 Frontend
```bash
npm run dev          # 🔥 Développement (http://localhost:3000)
npm run build        # 📦 Build production optimisé
npm run start        # 🚀 Serveur production
npm run lint         # 🔍 ESLint + Prettier
npm run type-check   # 📝 Vérification TypeScript
```

### ⚙️ Backend
```bash
npm run dev          # 🔥 Développement avec nodemon (http://localhost:5001)
npm run build        # 📦 Compilation TypeScript
npm run start        # 🚀 Serveur production
npm run test         # 🧪 Tests unitaires
```

### 🛠️ Scripts Globaux
```bash
./setup.sh           # 📦 Installation complète automatique
./start-dev.sh       # 🔥 Démarrage développement (frontend + backend)
./deploy.sh          # 🚀 Déploiement production avec Docker
./migrate.sh         # 🗄️ Migration base de données MongoDB
```

## ⚙️ Configuration

### 🎨 Frontend (.env.local)
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Features Flags
NEXT_PUBLIC_ENABLE_ADMIN=true
```

### ⚙️ Backend (.env)
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# Authentication
JWT_SECRET=your-super-secret-jwt-key-256-bits
JWT_EXPIRES_IN=7d

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Security
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🌐 URLs d'Accès

| Service | URL | Description |
|---------|-----|-------------|
| 🎨 **Frontend** | http://localhost:3000 | Interface utilisateur |
| ⚙️ **Backend API** | http://localhost:5001 | API REST |
| 🔐 **Admin Panel** | http://localhost:3000/admin | Panel d'administration |
| 📊 **API Health** | http://localhost:5001/health | Status serveur |
| 📚 **API Docs** | http://localhost:5001/api-docs | Documentation Swagger |

## 🚀 Déploiement

### Déploiement sur Vercel (Recommandé)

```bash
# Installation de Vercel CLI
npm i -g vercel

# Déploiement
cd frontend
vercel

# Ou via GitHub (automatique)
# Connecter le repo à Vercel pour déploiement automatique
```

### Déploiement sur Netlify

```bash
# Build de production
npm run build

# Déployer le dossier .next/out
# Ou connecter le repo GitHub à Netlify
```

### Déploiement Manuel

```bash
# Build statique
npm run build

# Le dossier .next contient les fichiers à déployer
# Servir avec n'importe quel serveur web statique
```

## 🔧 Configuration

### Variables d'Environnement (Optionnelles)
```env
# .env.local (si nécessaire pour des intégrations futures)
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

### Configuration Next.js
```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone'
}
```

## 🌐 Internationalisation

Le site supporte 3 langues :
- **Français (FR)** - Langue par défaut
- **Anglais (EN)** - Traduction complète
- **Hébreu (HE)** - Traduction complète

### Ajout de Traductions
```json
// locales/fr.json
{
  "nav": {
    "home": "Accueil",
    "about": "À Propos",
    "projects": "Projets",
    "contact": "Contact"
  }
}
```

## 🎯 Fonctionnalités Spécifiques

### Formulaire de Contact
- **Validation** : React Hook Form avec validation côté client
- **Simulation** : Pas d'envoi réel, affichage de confirmation
- **Toast** : Notifications avec React Hot Toast
- **Champs** : Nom, Email, Sujet, Message

### Section Projets
- **3 Projets Mockés** : Exemples de réalisations
- **Technologies** : Badges des technologies utilisées
- **Liens** : GitHub et démo (liens factices)

### Animations
- **Hero Section** : Animations de texte et particules
- **Scroll** : Animations au scroll avec Framer Motion
- **Hover** : Effets sur les boutons et cartes

## 🧪 Tests (Optionnel)

```bash
# Tests end-to-end avec Playwright
npm run test

# Tests spécifiques
npx playwright test --headed
```

## 📞 Contact

**Shay Acoca** - Développeur Frontend
- Email : contact@shayacoca.com
- LinkedIn : [linkedin.com/in/shayacoca](https://linkedin.com/in/shayacoca)
- Portfolio : [shayacoca.com](https://shayacoca.com)

---

## 📝 Notes Techniques

### Pourquoi Frontend Statique ?
- **Performance** : Chargement ultra-rapide
- **Simplicité** : Pas de serveur backend à maintenir
- **Coût** : Hébergement gratuit sur Vercel/Netlify
- **Sécurité** : Aucune surface d'attaque côté serveur
- **Scalabilité** : CDN global automatique

### Évolutions Possibles
- Ajout d'un backend pour le formulaire de contact
- Intégration d'un CMS headless (Strapi, Contentful)
- Ajout de Google Analytics
- Optimisation SEO avancée
- Tests automatisés

⭐ **Portfolio prêt à l'emploi et optimisé pour les recruteurs !**
