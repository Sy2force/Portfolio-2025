# 🚀 Guide de Déploiement

## 🌐 Options de Déploiement

### Option 1: Vercel + Render (Recommandé)
```bash
# Frontend sur Vercel
cd frontend
vercel --prod

# Backend sur Render
# Connecter le repo GitHub à Render
# Variables d'environnement à configurer sur Render
```

### Option 2: Docker Production
```bash
# Build et déploiement avec Docker
./deploy.sh

# Ou manuellement
docker-compose -f docker-compose.prod.yml up -d
```

### Option 3: Netlify + Railway
```bash
# Frontend sur Netlify
npm run build
# Déployer le dossier .next

# Backend sur Railway
# Connecter le repo GitHub à Railway
```

## ⚙️ Variables d'Environnement

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Backend (.env)
```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-secret-jwt-key-256-bits
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
CORS_ORIGIN=https://your-domain.com
```

## 🔒 Sécurité Production

### SSL/TLS
- Certificats automatiques avec Vercel/Netlify
- Configuration HTTPS obligatoire
- Headers de sécurité activés

### Base de Données
- MongoDB Atlas recommandé
- Connexions chiffrées
- Backup automatique

### Monitoring
- Health checks configurés
- Logs centralisés
- Alertes en cas d'erreur
