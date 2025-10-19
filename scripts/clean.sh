#!/bin/bash

echo "🧹 Nettoyage automatisé du portfolio en cours..."

# 🔸 Fichiers temporaires / backup / logs
echo "Suppression des fichiers temporaires..."
find . -type f -name "*.log" -delete
find . -type f -name "*.back*" -delete
find . -type f -name "*.tsbuildinfo" -delete
find . -type f -name ".DS_Store" -delete
find . -type f -name "Thumbs.db" -delete

# 🔸 Résultats de tests Playwright
echo "Suppression des résultats de tests..."
rm -rf frontend/test-results
rm -rf frontend/playwright-report

# 🔸 Cache et build artifacts
echo "Suppression des caches..."
rm -rf frontend/.next
rm -rf backend/dist
rm -rf node_modules/.cache

# 🔸 Fichiers de build temporaires
echo "Suppression des fichiers de build..."
find . -type f -name "*.map" -not -path "./node_modules/*" -delete

echo "✅ Nettoyage terminé avec succès!"
echo "📊 Espace libéré:"
du -sh . | tail -1
