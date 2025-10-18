# Guide de Déploiement Portfolio Shay Acoca 🚀

## 📋 Prérequis

- Compte GitHub
- Compte Vercel (gratuit)
- Compte Render (gratuit)
- Compte MongoDB Atlas (gratuit)
- Gmail avec mot de passe d'application

## 🎯 Architecture de Déploiement

```
Frontend (Vercel) ←→ Backend (Render) ←→ MongoDB Atlas
```

## 🚀 Étape 1: Déploiement Frontend sur Vercel

### 1.1 Préparation
```bash
cd frontend
npm install -g vercel
vercel login
```

### 1.2 Déploiement
```bash
vercel --prod
```

### 1.3 Configuration des Variables d'Environnement
Dans le dashboard Vercel, ajouter:
- `NEXT_PUBLIC_API_URL`: `https://portfolio-backend-shay.onrender.com`
- `NEXT_PUBLIC_SITE_URL`: `https://portfolio-shay-acoca.vercel.app`
- `NEXT_PUBLIC_CONTACT_EMAIL`: `shayacoca20@gmail.com`
- `NEXT_PUBLIC_GITHUB_URL`: `https://github.com/Sy2force`
- `NEXT_PUBLIC_LINKEDIN_URL`: `https://linkedin.com/in/shay-acoca`
- `NEXT_PUBLIC_EMAIL`: `shayacoca20@gmail.com`

## ⚙️ Étape 2: Configuration MongoDB Atlas

### 2.1 Créer un Cluster
1. Aller sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créer un compte gratuit
3. Créer un nouveau cluster (M0 Sandbox - gratuit)
4. Choisir une région proche (Europe)

### 2.2 Configuration Sécurité
1. **Database Access**: Créer un utilisateur
   - Username: `portfolio`
   - Password: Générer un mot de passe sécurisé
   - Rôle: `Atlas admin`

2. **Network Access**: Autoriser les connexions
   - Ajouter `0.0.0.0/0` (toutes les IPs)
   - Ou spécifier les IPs de Render

### 2.3 Obtenir la Connection String
1. Cliquer sur "Connect"
2. Choisir "Connect your application"
3. Copier la connection string
4. Remplacer `<password>` par le mot de passe créé

## 🖥️ Étape 3: Déploiement Backend sur Render

### 3.1 Créer un Web Service
1. Aller sur [Render](https://render.com)
2. Créer un compte gratuit
3. Cliquer "New +" → "Web Service"
4. Connecter le repository GitHub
5. Sélectionner le dossier `backend`

### 3.2 Configuration du Service
- **Name**: `portfolio-backend-shay`
- **Environment**: `Node`
- **Region**: `Frankfurt (EU Central)`
- **Branch**: `main`
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 3.3 Variables d'Environnement Render
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://portfolio:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=shayacoca20@gmail.com
EMAIL_PASS=your_gmail_app_password_here
FRONTEND_URL=https://portfolio-shay-acoca.vercel.app
ALLOWED_ORIGINS=https://portfolio-shay-acoca.vercel.app,http://localhost:3000
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📧 Étape 4: Configuration Gmail

### 4.1 Activer l'Authentification à 2 Facteurs
1. Aller dans les paramètres Google
2. Sécurité → Validation en 2 étapes
3. Activer la validation en 2 étapes

### 4.2 Générer un Mot de Passe d'Application
1. Paramètres Google → Sécurité
2. Mots de passe des applications
3. Sélectionner "Mail" et "Autre"
4. Nommer "Portfolio Backend"
5. Copier le mot de passe généré (16 caractères)

## 🔄 Étape 5: Tests et Validation

### 5.1 Tester le Backend
```bash
curl https://portfolio-backend-shay.onrender.com/api/health
```

### 5.2 Tester le Frontend
Visiter: `https://portfolio-shay-acoca.vercel.app`

### 5.3 Tester le Formulaire de Contact
1. Aller sur la page contact
2. Envoyer un message de test
3. Vérifier la réception dans Gmail

## 🛠️ Étape 6: Maintenance et Monitoring

### 6.1 Logs Backend (Render)
- Dashboard Render → Service → Logs
- Surveiller les erreurs et performances

### 6.2 Analytics Frontend (Vercel)
- Dashboard Vercel → Analytics
- Surveiller les performances et trafic

### 6.3 Base de Données (MongoDB Atlas)
- Dashboard Atlas → Metrics
- Surveiller les connexions et performances

## 🚨 Dépannage Courant

### Backend ne démarre pas
1. Vérifier les variables d'environnement
2. Vérifier la connection string MongoDB
3. Consulter les logs Render

### Formulaire de contact ne fonctionne pas
1. Vérifier EMAIL_USER et EMAIL_PASS
2. Vérifier que l'authentification 2FA est activée
3. Tester la connection SMTP

### CORS Errors
1. Vérifier FRONTEND_URL dans les variables backend
2. Vérifier ALLOWED_ORIGINS
3. Redéployer le backend

## 📊 URLs de Production

- **Frontend**: https://portfolio-shay-acoca.vercel.app
- **Backend**: https://portfolio-backend-shay.onrender.com
- **API Health**: https://portfolio-backend-shay.onrender.com/api/health
- **API Docs**: https://portfolio-backend-shay.onrender.com/api

## 🎉 Félicitations !

Votre portfolio est maintenant déployé en production avec:
- ✅ Frontend optimisé sur Vercel
- ✅ Backend scalable sur Render
- ✅ Base de données MongoDB Atlas
- ✅ Emails fonctionnels via Gmail
- ✅ HTTPS et sécurité configurés
- ✅ Monitoring et logs actifs

Le portfolio est accessible mondialement avec des performances optimales !
