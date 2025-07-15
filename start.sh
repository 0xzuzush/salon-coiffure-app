#!/bin/bash

# 🚀 Script de démarrage rapide pour le Salon de Coiffure
echo "💇‍♀️ Salon Belle Allure - Démarrage de l'application"
echo "=================================================="

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org"
    exit 1
fi

# Vérifier que MongoDB est installé et démarré
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB n'est pas installé ou pas dans le PATH"
    echo "📥 Installation recommandée :"
    echo "   - macOS: brew install mongodb-community"
    echo "   - Ubuntu: sudo apt install mongodb"
    echo "   - Windows: https://www.mongodb.com/try/download/community"
    echo ""
    echo "🔄 Ou utilisez MongoDB Atlas (cloud) en configurant MONGODB_URI dans .env"
fi

# Vérifier si le fichier .env existe
if [ ! -f .env ]; then
    echo "📄 Création du fichier .env à partir de .env.example..."
    cp .env.example .env
    echo "✅ Fichier .env créé"
    echo "⚠️  N'oubliez pas de configurer vos variables d'environnement dans .env"
    echo ""
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
    echo "✅ Dépendances installées"
    echo ""
fi

# Proposer d'initialiser la base de données
read -p "🗄️  Voulez-vous initialiser la base de données avec des données par défaut ? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Initialisation de la base de données..."
    npm run seed
    echo ""
fi

# Démarrer l'application
echo "🚀 Démarrage de l'application en mode développement..."
echo "📱 Frontend: http://localhost:5173 (ou 5174 si 5173 est occupé)"
echo "🔧 Backend API: http://localhost:5000"
echo ""
echo "⏹️  Pour arrêter: Ctrl+C"
echo ""

npm run dev
