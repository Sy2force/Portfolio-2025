# Windsurf Portfolio

Portfolio moderne et épuré avec Next.js 14, Tailwind CSS et Framer Motion.

## 🚀 Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Headless UI

**Backend:**
- Express.js
- MongoDB
- JWT Auth

## 📦 Installation

```bash
# Clone le projet
git clone https://github.com/yourusername/windsurf-portfolio.git
cd windsurf-portfolio

# Installation des dépendances
cd frontend && npm install
cd ../backend && npm install
```

## 🛠️ Scripts

**Frontend** (`cd frontend`):
```bash
npm run dev    # Développement (http://localhost:3000)
npm run build  # Build production
npm run start  # Serveur production
npm run lint   # Linting
```

**Backend** (`cd backend`):
```bash
npm run dev    # Développement (http://localhost:5001)
npm run build  # Build production
npm run start  # Serveur production
```

## 🚀 Déploiement

### Vercel (Frontend)

Déploiement manuel sur Vercel:

```bash
# Via CLI Vercel
npm i -g vercel
cd frontend
vercel --prod

# Ou via interface web Vercel
# 1. Importe le repo sur vercel.com
# 2. Configure: Root Directory = frontend
# 3. Deploy manuellement
```

### Render/Railway (Backend)

Pour le backend, utilise Render ou Railway avec les variables d'environnement du fichier `.env`.

## 📁 Structure

```
windsurf-portfolio/
├── frontend/          # App Next.js
│   ├── app/          # Routes et pages
│   ├── components/   # Composants réutilisables
│   ├── lib/          # Utilitaires et hooks
│   └── public/       # Assets statiques
│
├── backend/          # API Express
│   ├── src/          # Code source
│   └── dist/         # Build production
│
└── vercel.json       # Config déploiement
```

## ⚡ Features

- ✨ Animations fluides avec Framer Motion
- 🎨 Design moderne avec Tailwind CSS
- 📱 100% Responsive
- 🌙 Mode sombre/clair
- 🚀 Performances optimisées
- 🔐 Authentification JWT

## 📝 License

MIT

---

**Développé avec ❤️ par Shay Acoca**
