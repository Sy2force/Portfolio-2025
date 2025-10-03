# 🚀 Portfolio Futuriste - Full Stack

Portfolio professionnel ultra-moderne avec design futuriste, animations avancées et architecture Full Stack optimisée.

## 📁 Structure du Projet

```
portfolio/
├── frontend/              # Application React
│   ├── src/              # Code source React
│   ├── public/           # Assets publics
│   ├── dist/             # Build production
│   └── package.json      # Dépendances frontend
├── backend/              # API Node.js/Express
│   ├── src/              # Code source backend
│   ├── prisma/           # Schéma base de données
│   ├── uploads/          # Fichiers uploadés
│   └── package.json      # Dépendances backend
├── docker-compose.yml    # Configuration Docker
├── package.json          # Scripts monorepo
└── README.md            # Documentation
```

## 🛠️ Technologies

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** - Styling avec effets futuristes
- **Framer Motion** - Animations fluides
- **Three.js** - Effets 3D
- **PWA** - Progressive Web App

### Backend
- **Node.js** + **Express** + **TypeScript**
- **MongoDB** / **PostgreSQL** - Base de données
- **Redis** - Cache et sessions
- **JWT** - Authentication
- **Socket.io** - Temps réel

## ⚡ Installation Rapide

```bash
# Cloner le repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Installer toutes les dépendances
npm run install:all

# Démarrer en développement
npm run dev
```

## 🚀 Scripts Disponibles

### Commandes Racine
```bash
npm run dev          # Démarre frontend + backend
npm run build        # Build complet
npm run start        # Production mode
npm run test         # Tests complets
npm run docker:up    # Démarrer avec Docker
```

### Frontend uniquement
```bash
cd frontend
npm run dev          # Développement (port 5173)
npm run build        # Build production
npm run preview      # Preview build
```

### Backend uniquement
```bash
cd backend
npm run dev          # Développement (port 5000)
npm run build        # Build TypeScript
npm run start        # Production
```

## 🐳 Docker

```bash
# Build et démarrer tous les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Voir les logs
docker-compose logs -f
```

## 🔧 Configuration

### Variables d'environnement Frontend
```bash
# frontend/.env
VITE_API_URL=http://localhost:5000/api
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Variables d'environnement Backend
```bash
# backend/.env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-secret-key
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
```

## 📦 Déploiement

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Railway/Render)
```bash
cd backend
railway up
```

## 📊 Performances

- **Lighthouse Score**: 98/100
- **Bundle Size**: < 200KB (gzipped)
- **Time to Interactive**: < 2.5s
- **Core Web Vitals**: Tous au vert ✅

## 🔒 Sécurité

- JWT Authentication avec refresh tokens
- Rate limiting sur toutes les routes
- Protection XSS/CSRF
- Validation des données
- 2FA disponible

## 📝 License

MIT

## 👨‍💻 Auteur

**Votre Nom**
- Website: [portfolio.com](https://portfolio.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [/in/yourname](https://linkedin.com/in/yourname)

---

⭐ **N'oubliez pas de mettre une étoile si vous aimez ce projet!**
