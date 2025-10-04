# 🚀 Guide de Configuration Rapide

## Problème : "Erreur lors du chargement des données"

Cette erreur apparaît car la base de données MongoDB est vide. Voici comment la résoudre :

## Solution en 3 étapes

### 1️⃣ Démarrer MongoDB

```bash
# Si MongoDB est installé localement
mongod

# OU utiliser Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

### 2️⃣ Initialiser les données

```bash
cd backend
npm run init-data
```

Cela va créer les données par défaut pour :
- ✅ Page d'accueil (Home)
- ✅ À propos (About)
- ✅ Contact

### 3️⃣ Démarrer le projet

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Accès

- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:5000
- **Admin Login** : http://localhost:5173/admin/login
  - Email: `shayacoca20@gmail.com`
  - Password: `Asdfghj2323`

## Variables d'environnement

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-key-change-this
JWT_REFRESH_SECRET=your-refresh-secret-key
PORT=5000
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_EMAIL=shayacoca20@gmail.com
VITE_ADMIN_PASSWORD=Asdfghj2323
```

## Vérification

Une fois tout démarré :
1. Allez sur http://localhost:5173/admin/login
2. Connectez-vous avec les identifiants
3. Vous devriez voir le dashboard avec toutes les sections

## Problèmes courants

**MongoDB non connecté** :
```bash
# Vérifier si MongoDB tourne
ps aux | grep mongod

# Redémarrer MongoDB
brew services restart mongodb-community
```

**Port déjà utilisé** :
```bash
# Tuer le processus sur le port 5000
lsof -ti:5000 | xargs kill -9

# Tuer le processus sur le port 5173
lsof -ti:5173 | xargs kill -9
```

**Données non chargées** :
```bash
# Réinitialiser complètement
cd backend
npm run init-data
```
