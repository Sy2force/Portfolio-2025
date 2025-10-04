# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à ce projet ! Voici comment vous pouvez aider.

## 📋 Code de Conduite

- Soyez respectueux et professionnel
- Acceptez les critiques constructives
- Concentrez-vous sur ce qui est meilleur pour la communauté

## 🚀 Comment Contribuer

### 1. Fork & Clone

```bash
# Fork le projet sur GitHub
# Puis clonez votre fork
git clone https://github.com/VOTRE-USERNAME/Portfolio-2025.git
cd Portfolio-2025
```

### 2. Créer une branche

```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
# ou
git checkout -b fix/correction-bug
```

### 3. Installer les dépendances

```bash
npm run install:all
```

### 4. Développer

- Suivez les conventions de code existantes
- Écrivez des tests pour les nouvelles fonctionnalités
- Documentez votre code
- Testez localement

```bash
npm run dev
npm run lint
npm run test
```

### 5. Commit

Utilisez des messages de commit clairs et descriptifs :

```bash
git commit -m "feat: ajouter système de notifications"
git commit -m "fix: corriger erreur upload fichier"
git commit -m "docs: mettre à jour README"
```

**Convention des commits** :
- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, point-virgules manquants, etc.
- `refactor:` Refactoring du code
- `test:` Ajout de tests
- `chore:` Maintenance

### 6. Push & Pull Request

```bash
git push origin feature/ma-nouvelle-fonctionnalite
```

Puis créez une Pull Request sur GitHub avec :
- Titre clair et descriptif
- Description détaillée des changements
- Screenshots si applicable
- Référence aux issues liées

## 🧪 Tests

Assurez-vous que tous les tests passent :

```bash
# Tests backend
cd backend && npm test

# Tests frontend
cd frontend && npm test

# Tous les tests
npm run test
```

## 📝 Style de Code

Le projet utilise ESLint et Prettier :

```bash
# Vérifier le style
npm run lint

# Corriger automatiquement
npm run lint:fix

# Formater le code
npm run format
```

## 🐛 Signaler un Bug

Créez une issue avec :
- Description claire du problème
- Steps pour reproduire
- Comportement attendu vs actuel
- Screenshots si applicable
- Environnement (OS, Node version, etc.)

## 💡 Proposer une Fonctionnalité

Créez une issue "Feature Request" avec :
- Description de la fonctionnalité
- Cas d'usage
- Mockups/wireframes si possible
- Impact estimé

## ✅ Checklist PR

Avant de soumettre votre PR, vérifiez :

- [ ] Le code compile sans erreurs
- [ ] Tous les tests passent
- [ ] Le code est linté et formaté
- [ ] La documentation est à jour
- [ ] Les commits suivent la convention
- [ ] Pas de console.log oubliés
- [ ] Les variables sensibles sont dans .env

## 🎯 Priorités Actuelles

Consultez les [Issues](https://github.com/Sy2force/Portfolio-2025/issues) pour voir les besoins actuels.

**Labels** :
- `good first issue` - Bon pour débuter
- `help wanted` - Besoin d'aide
- `bug` - Bugs à corriger
- `enhancement` - Améliorations

## 📞 Questions ?

- Ouvrez une [Discussion](https://github.com/Sy2force/Portfolio-2025/discussions)
- Contactez [@Sy2force](https://github.com/Sy2force)

Merci de contribuer ! 🙏
