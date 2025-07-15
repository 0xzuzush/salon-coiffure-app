# 💇‍♀️ Salon de Coiffure - Application de Prise de Rendez-vous

Une application web moderne et responsive pour la gestion des rendez-vous d'un salon de coiffure, développée avec React.js et Node.js.

## ✨ Fonctionnalités

### 🏠 Page d'Accueil
- Présentation élégante du salon avec images et description
- Section "Nos Services" avec détails des prestations
- Témoignages clients avec système d'évaluation
- Design responsive et accessible (WCAG 2.1)

### 📅 Système de Rendez-vous
- **Calendrier interactif** avec FullCalendar
- **Processus en 3 étapes** : Date → Service & Coiffeur → Informations client
- **Gestion intelligente des créneaux** avec disponibilités en temps réel
- **Validation des données** côté client et serveur
- **Prévention des conflits** de réservation

### ✅ Confirmation et Notifications
- Page de confirmation détaillée
- **Ajout automatique au calendrier** (Google Calendar, Outlook)
- **Notifications par email** avec EmailJS
- Informations pratiques (adresse, parking, etc.)

### 🔧 Backend et Administration
- **API REST** complète avec Express.js
- **Base de données MongoDB** avec Mongoose
- **Authentification JWT** pour les coiffeurs
- **Gestion des utilisateurs** et des rôles
- **Notifications email** automatiques

## 🛠️ Technologies Utilisées

### Frontend
- **React.js** (v19) avec hooks modernes
- **Vite** pour le build et le développement
- **React Router** pour la navigation
- **FullCalendar** pour le calendrier interactif
- **Axios** pour les appels API
- **EmailJS** pour les notifications client

### Backend
- **Node.js** avec **Express.js**
- **MongoDB** avec **Mongoose**
- **JWT** pour l'authentification
- **Bcrypt** pour le hashage des mots de passe
- **Nodemailer** pour les emails serveur
- **CORS** pour les requêtes cross-origin

### Outils de Développement
- **ESLint** pour la qualité du code
- **Concurrently** pour le développement simultané
- **Nodemon** pour le rechargement automatique

## 🚀 Installation et Configuration

### Prérequis
- Node.js (v16 ou supérieur)
- MongoDB (local ou Atlas)
- Git

### 1. Cloner le projet
```bash
git clone https://github.com/0xzuzush/salon-coiffure-app.git
cd salon-coiffure-app
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de l'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env avec vos propres valeurs
nano .env
```

**Variables d'environnement importantes :**
```env
# Base de données
MONGODB_URI=mongodb://localhost:27017/salon-coiffure

# Sécurité
JWT_SECRET=votre-cle-secrete-tres-longue

# Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app

# EmailJS (optionnel)
REACT_APP_EMAILJS_SERVICE_ID=votre-service-id
REACT_APP_EMAILJS_TEMPLATE_ID=votre-template-id
REACT_APP_EMAILJS_PUBLIC_KEY=votre-cle-publique
```

### 4. Démarrage de MongoDB
```bash
# Si MongoDB est installé localement
mongod

# Ou utiliser MongoDB Atlas (cloud)
```

### 5. Lancement en mode développement
```bash
# Démarre simultanément le frontend et le backend
npm run dev
```

**Ou séparément :**
```bash
# Frontend (port 5173)
npm run client

# Backend (port 5000)
npm run server
```

## 📱 Utilisation

### Pour les Clients
1. **Accédez** à `http://localhost:5173`
2. **Cliquez** sur "Prendre Rendez-vous"
3. **Sélectionnez** votre date dans le calendrier
4. **Choisissez** votre service et coiffeur préféré
5. **Remplissez** vos informations personnelles
6. **Confirmez** votre rendez-vous

### Pour les Coiffeurs (Gestion)
- Authentification via l'API
- Gestion des rendez-vous
- Consultation du planning
- Mise à jour des disponibilités

## 🏗️ Structure du Projet

```
salon-coiffure-app/
├── 📁 public/                 # Assets statiques
├── 📁 src/
│   ├── 📁 components/         # Composants React
│   │   ├── Home.jsx           # Page d'accueil
│   │   ├── Appointment.jsx    # Prise de rendez-vous
│   │   ├── Confirmation.jsx   # Confirmation
│   │   └── *.css             # Styles des composants
│   ├── 📁 services/
│   │   └── api.js            # Service API
│   ├── App.jsx               # Composant principal
│   ├── App.css               # Styles globaux
│   └── main.jsx              # Point d'entrée
├── 📁 server/                # Backend Express
│   ├── 📁 models/            # Modèles MongoDB
│   │   ├── Appointment.js    # Modèle Rendez-vous
│   │   └── User.js           # Modèle Utilisateur
│   ├── 📁 routes/            # Routes API
│   │   ├── appointments.js   # CRUD rendez-vous
│   │   └── users.js          # Authentification
│   └── app.js                # Serveur principal
├── .env.example              # Variables d'environnement
├── package.json              # Dépendances et scripts
└── README.md                 # Documentation
```

## 🔧 Scripts Disponibles

```bash
# Développement (frontend + backend)
npm run dev

# Frontend uniquement
npm run client

# Backend uniquement
npm run server

# Production
npm run build
npm start

# Qualité du code
npm run lint
```

## 🎨 Personnalisation

### Couleurs et Thème
Modifiez les variables CSS dans `src/App.css` :
```css
:root {
  --primary-color: #d4a574;    /* Couleur principale */
  --secondary-color: #2c3e50;  /* Couleur secondaire */
  --accent-color: #e74c3c;     /* Couleur d'accent */
}
```

### Services et Coiffeurs
Adaptez les données dans :
- `src/components/Appointment.jsx` (services par défaut)
- `server/models/Appointment.js` (validation)

### Horaires et Disponibilités
Modifiez les créneaux dans :
- `server/routes/appointments.js` (fonction `available-slots`)

## 📧 Configuration Email

### EmailJS (Recommandé pour le frontend)
1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Configurez un service email
3. Créez un template avec les variables appropriées
4. Ajoutez les clés dans `.env`

### Nodemailer (Backend)
1. Configurez un compte email (Gmail recommandé)
2. Activez l'authentification à 2 facteurs
3. Générez un mot de passe d'application
4. Ajoutez les paramètres SMTP dans `.env`

## 🔒 Sécurité

- ✅ **Validation des données** côté client et serveur
- ✅ **Authentification JWT** sécurisée
- ✅ **Hashage des mots de passe** avec bcrypt
- ✅ **Protection CORS** configurée
- ✅ **Validation des créneaux** anti-double-booking
- ✅ **Sanitization des inputs** MongoDB

## ♿ Accessibilité

- ✅ **Conformité WCAG 2.1 AA**
- ✅ **Navigation au clavier** complète
- ✅ **Focus visuel** clairement défini
- ✅ **Contraste élevé** supporté
- ✅ **Lecteurs d'écran** compatibles
- ✅ **Responsive design** mobile-first

## 📱 Responsive Design

- ✅ **Mobile First** (320px+)
- ✅ **Tablette** (768px+)
- ✅ **Desktop** (1024px+)
- ✅ **Large screens** (1440px+)

## 🐛 Dépannage

### Problèmes courants

**Erreur de connexion MongoDB :**
```bash
# Vérifiez que MongoDB est démarré
sudo systemctl status mongod

# Ou pour macOS avec Homebrew
brew services list | grep mongodb
```

**Port déjà utilisé :**
```bash
# Tuez le processus sur le port 5000
lsof -ti:5000 | xargs kill -9

# Ou changez le port dans .env
PORT=3001
```

**Modules non trouvés :**
```bash
# Supprimez node_modules et réinstallez
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contribution

1. **Fork** le projet
2. **Créez** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Committez** vos changements (`git commit -m 'Add AmazingFeature'`)
4. **Pushez** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
