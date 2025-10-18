# Configuration des Secrets GitHub Actions

## Secrets requis pour le déploiement

### 1. Secrets Vercel (Frontend)
```bash
# Obtenez votre token Vercel
npx vercel login
npx vercel link

# Dans votre projet Vercel, récupérez:
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id  
VERCEL_PROJECT_ID=your_project_id
```

### 2. Secrets Render (Backend)
```bash
# Dans votre dashboard Render, créez un webhook de déploiement
RENDER_DEPLOY_HOOK=https://api.render.com/deploy/srv-xxxxx?key=xxxxx
```

## Configuration via GitHub CLI

```bash
# Installer GitHub CLI si nécessaire
brew install gh

# Se connecter
gh auth login

# Ajouter les secrets
gh secret set VERCEL_TOKEN --body "your_vercel_token"
gh secret set VERCEL_ORG_ID --body "your_org_id"
gh secret set VERCEL_PROJECT_ID --body "your_project_id"
gh secret set RENDER_DEPLOY_HOOK --body "your_render_webhook_url"
```

## Configuration via Interface GitHub

1. Allez sur votre repository GitHub
2. Settings → Secrets and variables → Actions
3. Cliquez "New repository secret"
4. Ajoutez chaque secret avec sa valeur

## Vérification

Une fois configuré, le workflow se déclenchera automatiquement sur:
- Push vers `main` ou `master`
- Pull requests

## Étapes du déploiement

1. **Test**: Lint et build du code
2. **Security**: Audit des dépendances
3. **Deploy Frontend**: Déploiement Vercel
4. **Deploy Backend**: Déploiement Render

## Dépannage

- Vérifiez que tous les secrets sont configurés
- Consultez les logs dans l'onglet "Actions" de GitHub
- Assurez-vous que les branches `main`/`master` existent
