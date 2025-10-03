# 🚀 Guide de Déploiement - Portfolio

Ce guide vous explique comment déployer votre portfolio sur **Render** (backend) et **Vercel** (frontend).

## 📋 Prérequis

- Compte GitHub avec le code poussé
- Compte Render (gratuit) : https://render.com
- Compte Vercel (gratuit) : https://vercel.com
- MongoDB Atlas (gratuit) : https://www.mongodb.com/cloud/atlas
- Redis Cloud (gratuit) : https://redis.com/try-free

---

## 🗄️ Étape 1 : Configurer MongoDB Atlas

1. Créez un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créez un nouveau cluster (Free Tier M0)
3. Créez un utilisateur de base de données
4. Whitelist toutes les IPs : `0.0.0.0/0`
5. Obtenez votre connection string : `mongodb+srv://username:password@cluster.mongodb.net/portfolio`

---

## 🔴 Étape 2 : Configurer Redis Cloud

1. Créez un compte sur [Redis Cloud](https://redis.com/try-free)
2. Créez une nouvelle base de données (Free 30MB)
3. Obtenez votre Redis URL : `redis://default:password@host:port`

---

## 🔧 Étape 3 : Déployer le Backend sur Render

### Option A : Via le Dashboard Render

1. **Connectez-vous à Render** : https://dashboard.render.com
2. **Créez un nouveau Web Service** :
   - Click "New +" → "Web Service"
   - Connectez votre repository GitHub
   - Sélectionnez le repo `Portfolio-2025`

3. **Configuration du service** :
   ```
   Name: portfolio-backend
   Region: Oregon (US West)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   Instance Type: Free
   ```

4. **Variables d'environnement** (Add Environment Variables) :
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   JWT_SECRET=votre_secret_jwt_super_securise_32_caracteres_minimum
   JWT_REFRESH_SECRET=votre_refresh_secret_different_32_caracteres_minimum
   JWT_EXPIRES_IN=7d
   JWT_REFRESH_EXPIRES_IN=30d
   REDIS_URL=redis://default:password@host:port
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=votre.email@gmail.com
   SMTP_PASS=votre_app_password
   ADMIN_EMAIL=votre.email@gmail.com
   CLIENT_URL=https://votre-portfolio.vercel.app
   ```

5. **Déployez** : Click "Create Web Service"

### Option B : Via render.yaml (automatique)

Le fichier `render.yaml` est déjà configuré. Render le détectera automatiquement.

---

## ⚡ Étape 4 : Déployer le Frontend sur Vercel

### Via le Dashboard Vercel

1. **Connectez-vous à Vercel** : https://vercel.com/dashboard
2. **Importez votre projet** :
   - Click "Add New..." → "Project"
   - Importez depuis GitHub : `Portfolio-2025`

3. **Configuration du projet** :
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Variables d'environnement** :
   ```
   VITE_API_URL=https://portfolio-backend.onrender.com
   VITE_GA_TRACKING_ID=votre_google_analytics_id (optionnel)
   ```

5. **Déployez** : Click "Deploy"

### Via CLI Vercel

```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

---

## 🔐 Étape 5 : Configuration SMTP (Email)

### Option 1 : Gmail

1. Activez la validation en 2 étapes sur votre compte Google
2. Générez un "App Password" : https://myaccount.google.com/apppasswords
3. Utilisez ces credentials dans les variables d'environnement Render

### Option 2 : SendGrid (Recommandé pour production)

1. Créez un compte sur [SendGrid](https://sendgrid.com)
2. Générez une API Key
3. Configurez :
   ```
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=votre_sendgrid_api_key
   ```

---

## ✅ Étape 6 : Vérification du Déploiement

### Backend (Render)
- URL : `https://portfolio-backend.onrender.com`
- Health check : `https://portfolio-backend.onrender.com/api/health`
- API docs : `https://portfolio-backend.onrender.com/api-docs`

### Frontend (Vercel)
- URL : `https://votre-portfolio.vercel.app`
- Testez la navigation et les fonctionnalités

---

## 🔄 Étape 7 : Mise à jour automatique

Les deux plateformes sont configurées pour le déploiement continu :

```bash
# Après chaque modification
git add .
git commit -m "Votre message"
git push origin main

# Render et Vercel déploieront automatiquement
```

---

## 🐛 Dépannage

### Backend ne démarre pas
- Vérifiez les logs Render
- Vérifiez que MongoDB URI est correct
- Vérifiez que toutes les variables d'environnement sont définies

### Frontend ne se connecte pas au backend
- Vérifiez `VITE_API_URL` dans Vercel
- Vérifiez que le backend est en ligne
- Vérifiez les CORS dans `backend/src/server.ts`

### Erreurs de build
- Vérifiez les versions Node.js (18+)
- Nettoyez le cache : Render → Settings → Clear Build Cache
- Vérifiez les dépendances dans package.json

---

## 📊 Monitoring

### Render
- Dashboard : https://dashboard.render.com
- Logs en temps réel
- Métriques de performance

### Vercel
- Dashboard : https://vercel.com/dashboard
- Analytics intégrés
- Web Vitals

---

## 💰 Coûts

- **Render Free Tier** : Gratuit (750h/mois, sleep après 15min d'inactivité)
- **Vercel Hobby** : Gratuit (100GB bandwidth/mois)
- **MongoDB Atlas** : Gratuit (512MB storage)
- **Redis Cloud** : Gratuit (30MB)

**Total : 0€/mois** 🎉

---

## 🔒 Sécurité

- ✅ Utilisez des secrets forts (32+ caractères)
- ✅ Ne commitez jamais les fichiers `.env`
- ✅ Activez HTTPS (automatique sur Render/Vercel)
- ✅ Configurez les CORS correctement
- ✅ Utilisez des App Passwords pour Gmail

---

## 📞 Support

- Render Docs : https://render.com/docs
- Vercel Docs : https://vercel.com/docs
- MongoDB Docs : https://docs.mongodb.com

Bon déploiement ! 🚀
