# 🚀 Portfolio Futuriste - Full Stack Developer

Un portfolio ultra-moderne avec un design futuriste unique, créé avec React, TypeScript, Tailwind CSS et des animations avancées.

![Portfolio Preview](https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop)

## ✨ Fonctionnalités

- 🎨 **Design Futuriste Unique** : Effets néon, glassmorphism, animations 3D
- ⚡ **Performance Optimale** : Vite, lazy loading, code splitting
- 📱 **100% Responsive** : Adapté à tous les écrans
- 🌐 **Multilingue** : Support FR/EN (i18next ready)
- 🎭 **Animations Avancées** : Framer Motion, GSAP, particules
- 📧 **Formulaire Contact** : Intégration EmailJS
- 🔍 **SEO Optimisé** : Meta tags, OpenGraph, sitemap
- 🎯 **Pages Complètes** : Home, About, Skills, Projects, Services, CV, Contact
- 🔐 **Admin Dashboard** : Gestion des projets (optionnel)
- 🌙 **Dark Mode** : Thème sombre par défaut

## 🛠️ Technologies

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Styling utility-first
- **Framer Motion** - Animations fluides
- **GSAP** - Animations complexes
- **Three.js** - Effets 3D (optionnel)
- **React Router** - Navigation SPA

### Outils
- **EmailJS** - Envoi d'emails
- **React Icons** - Icônes
- **React Hot Toast** - Notifications
- **Zustand** - State management
- **i18next** - Internationalisation

## 🚀 Installation

### Prérequis
- Node.js 16+ 
- npm ou yarn

### Étapes

1. **Cloner le repository**
\`\`\`bash
git clone https://github.com/yourusername/portfolio-futuriste.git
cd portfolio-futuriste
\`\`\`

2. **Installer les dépendances**
\`\`\`bash
npm install
\`\`\`

3. **Configuration EmailJS**
   - Créez un compte sur [EmailJS](https://www.emailjs.com/)
   - Créez un service email et un template
   - Copiez \`.env.example\` vers \`.env\`
   - Ajoutez vos clés EmailJS

4. **Lancer le serveur de développement**
\`\`\`bash
npm run dev
\`\`\`

5. **Accéder au site**
\`\`\`
http://localhost:5173
\`\`\`

## 📁 Structure du Projet

\`\`\`
portfolio-futuriste/
├── src/
│   ├── components/        # Composants réutilisables
│   │   ├── Layout/        # Navbar, Footer, Layout
│   │   ├── Home/          # Composants page Home
│   │   ├── UI/            # Composants UI génériques
│   │   └── Background/    # Effets de fond
│   ├── pages/            # Pages de l'application
│   ├── assets/           # Images, fonts, etc.
│   ├── styles/           # Styles globaux
│   ├── utils/            # Fonctions utilitaires
│   ├── App.tsx           # Composant racine
│   ├── main.tsx          # Point d'entrée
│   └── index.css         # Styles Tailwind
├── public/               # Assets publics
├── index.html           # Template HTML
├── package.json         # Dépendances
├── tsconfig.json        # Config TypeScript
├── tailwind.config.js   # Config Tailwind
├── vite.config.ts       # Config Vite
└── vercel.json          # Config déploiement
\`\`\`

## 🎨 Personnalisation

### 1. Informations Personnelles
Modifiez vos informations dans :
- \`src/pages/About.tsx\` - Bio et parcours
- \`src/pages/CV.tsx\` - CV détaillé
- \`src/components/Layout/Footer.tsx\` - Liens sociaux

### 2. Projets
Ajoutez vos projets dans :
- \`src/pages/Projects.tsx\` - Liste des projets
- \`src/components/Home/FeaturedProjects.tsx\` - Projets en vedette

### 3. Couleurs et Thème
Personnalisez les couleurs dans :
- \`tailwind.config.js\` - Palette de couleurs
- \`src/index.css\` - Styles globaux

### 4. EmailJS Configuration
\`\`\`javascript
// src/pages/Contact.tsx
await emailjs.send(
  'YOUR_SERVICE_ID',    // Remplacez
  'YOUR_TEMPLATE_ID',   // Remplacez
  templateParams,
  'YOUR_PUBLIC_KEY'     // Remplacez
)
\`\`\`

## 📦 Build et Déploiement

### Build pour Production
\`\`\`bash
npm run build
\`\`\`

### Preview Local
\`\`\`bash
npm run preview
\`\`\`

### Déploiement sur Vercel
\`\`\`bash
npm run deploy
\`\`\`

Ou utilisez le bouton ci-dessous :

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/portfolio-futuriste)

### Autres Options de Déploiement
- **Netlify** : Drop le dossier \`dist\`
- **GitHub Pages** : Utilisez gh-pages
- **Render** : Connectez votre repo

## 🔧 Scripts Disponibles

\`\`\`json
{
  "dev": "Lancer le serveur de développement",
  "build": "Build pour production",
  "preview": "Preview du build",
  "lint": "Vérifier le code",
  "deploy": "Déployer sur Vercel"
}
\`\`\`

## 📝 TODO / Améliorations Futures

- [ ] Ajouter des tests (Vitest, Playwright)
- [ ] Backend Node.js/Express complet
- [ ] Base de données pour les projets
- [ ] Blog intégré
- [ ] Analytics dashboard
- [ ] Mode clair/sombre toggle
- [ ] PWA support
- [ ] Animations 3D avancées
- [ ] CMS headless integration

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Fork le projet
2. Créez votre branche (\`git checkout -b feature/AmazingFeature\`)
3. Commit vos changements (\`git commit -m 'Add AmazingFeature'\`)
4. Push vers la branche (\`git push origin feature/AmazingFeature\`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier \`LICENSE\` pour plus de détails.

## 📞 Contact

**John Doe** - [@johndoe](https://twitter.com/johndoe) - john.doe@email.com

Lien du projet : [https://github.com/yourusername/portfolio-futuriste](https://github.com/yourusername/portfolio-futuriste)

## 🙏 Remerciements

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Vite](https://vitejs.dev/)
- [EmailJS](https://www.emailjs.com/)
- [Vercel](https://vercel.com/)

---

⭐ **N'oubliez pas de mettre une étoile si vous aimez ce projet !** ⭐
