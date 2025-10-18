# 🏗️ Architecture du Portfolio

## 📁 Structure Organisée

```
Portfolio-Shay/
├── 📚 docs/                           # Documentation technique
│   ├── ARCHITECTURE.md                # Ce fichier
│   ├── API.md                         # Documentation API
│   └── DEPLOYMENT.md                  # Guide déploiement
├── 🎨 frontend/                       # Application Next.js 14
│   ├── app/                          # Pages (App Router)
│   ├── components/                   # Composants React
│   ├── lib/                         # Données et utilitaires
│   ├── styles/                      # Styles CSS
│   └── public/                      # Assets statiques
├── ⚙️ backend/                        # API Express.js
│   └── src/
│       ├── controllers/             # Contrôleurs API
│       ├── middleware/              # Middlewares
│       ├── models/                  # Modèles MongoDB
│       ├── routes/                  # Routes API
│       ├── config/                  # Configuration
│       ├── scripts/                 # Scripts utilitaires
│       ├── types/                   # Types TypeScript
│       └── utils/                   # Fonctions utilitaires
├── 🐳 docker-compose.yml             # Orchestration Docker
├── 🚀 deploy.sh                      # Script déploiement
├── 📦 setup.sh                       # Script installation
├── 🔧 start-dev.sh                   # Script développement
└── 📖 README.md                      # Documentation principale
```

## 🎯 Principes d'Organisation

### 1. Séparation Frontend/Backend
- **Frontend** : Interface utilisateur moderne avec Next.js
- **Backend** : API REST robuste avec Express.js
- **Communication** : API REST avec authentification JWT

### 2. Structure Modulaire
- **Composants** : Réutilisables et atomiques
- **Pages** : Organisées par fonctionnalité
- **Services** : Logique métier centralisée

### 3. Configuration Centralisée
- **Environment** : Variables d'environnement sécurisées
- **Types** : TypeScript strict pour la sécurité
- **Validation** : Joi côté backend, Zod côté frontend

## 🔧 Technologies Utilisées

### Frontend Stack
- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript 5.0
- **Styling** : Tailwind CSS 3.4
- **Animations** : Framer Motion
- **State** : React Context + useState
- **Forms** : React Hook Form
- **HTTP** : Fetch API native

### Backend Stack
- **Runtime** : Node.js 18+
- **Framework** : Express.js
- **Database** : MongoDB + Mongoose
- **Auth** : JWT + bcrypt
- **Validation** : Joi
- **Email** : Nodemailer
- **Security** : Helmet, CORS, Rate Limiting

### DevOps Stack
- **Container** : Docker + Docker Compose
- **Scripts** : Bash automation
- **Environment** : Secure env variables
- **Monitoring** : Health checks
- **Deployment** : Automated scripts
