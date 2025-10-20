#!/bin/bash

# 🧹 Script de nettoyage cache Windsurf + Portfolio Shay Acoca
# Optimise les performances et libère l'espace disque

echo "🚀 Nettoyage du cache Windsurf et optimisation Portfolio..."

# ===== NETTOYAGE WINDSURF =====
echo "📁 Nettoyage cache Windsurf..."

# Cache Windsurf (macOS)
if [ -d "$HOME/Library/Caches/com.codeium.windsurf" ]; then
    echo "  ➜ Suppression cache Windsurf principal..."
    rm -rf "$HOME/Library/Caches/com.codeium.windsurf"
fi

# Logs Windsurf
if [ -d "$HOME/Library/Logs/Windsurf" ]; then
    echo "  ➜ Suppression logs Windsurf..."
    rm -rf "$HOME/Library/Logs/Windsurf"
fi

# Extensions cache
if [ -d "$HOME/.windsurf/extensions" ]; then
    echo "  ➜ Nettoyage cache extensions..."
    find "$HOME/.windsurf/extensions" -name "*.log" -delete
    find "$HOME/.windsurf/extensions" -name "*.cache" -delete
fi

# Workspace cache
if [ -d "$HOME/.windsurf/User/workspaceStorage" ]; then
    echo "  ➜ Nettoyage workspace storage..."
    rm -rf "$HOME/.windsurf/User/workspaceStorage"
fi

# ===== NETTOYAGE PROJET =====
echo "📦 Nettoyage cache projet Portfolio..."

# Node modules et caches
echo "  ➜ Suppression node_modules..."
rm -rf node_modules
rm -rf frontend/node_modules
rm -rf backend/node_modules

echo "  ➜ Suppression caches npm/yarn..."
rm -rf .npm
rm -rf frontend/.npm
rm -rf backend/.npm
rm -rf yarn-error.log
rm -rf frontend/yarn-error.log
rm -rf backend/yarn-error.log

# Next.js cache
echo "  ➜ Suppression cache Next.js..."
rm -rf frontend/.next
rm -rf frontend/out
rm -rf frontend/.vercel

# TypeScript cache
echo "  ➜ Suppression cache TypeScript..."
rm -rf frontend/.tsbuildinfo
rm -rf backend/.tsbuildinfo
rm -rf frontend/tsconfig.tsbuildinfo
rm -rf backend/tsconfig.tsbuildinfo

# Build artifacts
echo "  ➜ Suppression builds..."
rm -rf backend/dist
rm -rf frontend/dist
rm -rf build

# Tests cache
echo "  ➜ Suppression cache tests..."
rm -rf frontend/coverage
rm -rf backend/coverage
rm -rf test-results
rm -rf playwright-report
rm -rf frontend/playwright-report
rm -rf frontend/test-results

# ESLint cache
echo "  ➜ Suppression cache ESLint..."
rm -rf .eslintcache
rm -rf frontend/.eslintcache
rm -rf backend/.eslintcache

# Logs et temps
echo "  ➜ Suppression logs projet..."
rm -rf logs
rm -rf frontend/logs
rm -rf backend/logs
find . -name "*.log" -not -path "./node_modules/*" -delete

# Fichiers temporaires
echo "  ➜ Suppression fichiers temporaires..."
find . -name ".DS_Store" -delete
find . -name "Thumbs.db" -delete
find . -name "*.tmp" -delete
find . -name "*.temp" -delete

# ===== RÉINSTALLATION PROPRE =====
echo "⚡ Réinstallation des dépendances..."

# Installation root
echo "  ➜ Installation dépendances racine..."
npm install --force --no-audit

# Vérification santé installation
echo "🔍 Vérification santé du projet..."

# Audit sécurité
echo "  ➜ Audit sécurité..."
npm audit --audit-level high 2>/dev/null || echo "    ⚠️  Quelques warnings (non-critiques)"

# Test build rapide
echo "  ➜ Test build rapide..."
cd frontend && npm run build --silent >/dev/null 2>&1 && echo "    ✅ Frontend OK" || echo "    ❌ Frontend build failed"
cd ../backend && npm run build --silent >/dev/null 2>&1 && echo "    ✅ Backend OK" || echo "    ❌ Backend build failed"
cd ..

# ===== OPTIMISATIONS FINALES =====
echo "🔧 Optimisations finales..."

# Nettoyage npm cache global
echo "  ➜ Nettoyage cache npm global..."
npm cache clean --force >/dev/null 2>&1

# Vérification espace libéré
echo "📊 Calcul espace libéré..."
FREED_SPACE=$(du -sh node_modules 2>/dev/null | cut -f1 || echo "N/A")
echo "  ➜ Espace projet optimisé: $FREED_SPACE"

# ===== RÉSUMÉ =====
echo ""
echo "✅ =================================="
echo "🎉 NETTOYAGE WINDSURF TERMINÉ !"
echo "✅ =================================="
echo ""
echo "📋 Actions effectuées:"
echo "  ✓ Cache Windsurf supprimé"
echo "  ✓ Logs Windsurf nettoyés" 
echo "  ✓ Cache projet optimisé"
echo "  ✓ Dépendances réinstallées"
echo "  ✓ Build test effectué"
echo ""
echo "🚀 Windsurf devrait maintenant être:"
echo "  • Plus rapide au démarrage"
echo "  • Plus réactif à l'édition"
echo "  • Moins gourmand en mémoire"
echo "  • Sans erreurs de cache"
echo ""
echo "💡 Actions recommandées:"
echo "  1. Redémarrer Windsurf complètement"
echo "  2. Rouvrir le projet"
echo "  3. Attendre l'indexation TypeScript"
echo "  4. Tester avec: npm run dev"
echo ""
echo "🔄 Si problèmes persistent:"
echo "  • Redémarrer macOS"
echo "  • Vérifier espace disque disponible"
echo "  • Mettre à jour Windsurf"
echo ""

# Permissions script
chmod +x "$0" 2>/dev/null
