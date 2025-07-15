const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

// Données par défaut pour les coiffeurs
const defaultStylists = [
  {
    username: 'sarah.martin',
    email: 'sarah@salonbelleallure.fr',
    password: 'password123',
    role: 'stylist',
    firstName: 'Sarah',
    lastName: 'Martin',
    stylistInfo: {
      specialties: ['coupe', 'coloration', 'coiffure-mariage'],
      workDays: [1, 2, 3, 4, 5, 6], // Lundi à Samedi
      workHours: {
        start: '09:00',
        end: '18:00'
      }
    }
  },
  {
    username: 'marie.dubois',
    email: 'marie@salonbelleallure.fr',
    password: 'password123',
    role: 'stylist',
    firstName: 'Marie',
    lastName: 'Dubois',
    stylistInfo: {
      specialties: ['meches', 'coloration', 'coiffure-mariage'],
      workDays: [1, 2, 3, 4, 5, 6],
      workHours: {
        start: '09:00',
        end: '18:00'
      }
    }
  },
  {
    username: 'julie.rousseau',
    email: 'julie@salonbelleallure.fr',
    password: 'password123',
    role: 'stylist',
    firstName: 'Julie',
    lastName: 'Rousseau',
    stylistInfo: {
      specialties: ['coupe', 'brushing', 'shampoing'],
      workDays: [1, 2, 3, 4, 5, 6],
      workHours: {
        start: '09:00',
        end: '18:00'
      }
    }
  },
  {
    username: 'antoine.bernard',
    email: 'antoine@salonbelleallure.fr',
    password: 'password123',
    role: 'stylist',
    firstName: 'Antoine',
    lastName: 'Bernard',
    stylistInfo: {
      specialties: ['coupe', 'coloration'],
      workDays: [1, 2, 3, 4, 5, 6],
      workHours: {
        start: '09:00',
        end: '18:00'
      }
    }
  },
  {
    username: 'admin',
    email: 'admin@salonbelleallure.fr',
    password: 'admin123',
    role: 'admin',
    firstName: 'Admin',
    lastName: 'Salon'
  }
];

async function seedDatabase() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/salon-coiffure', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🔗 Connecté à MongoDB');

    // Supprimer les utilisateurs existants (optionnel - décommentez si nécessaire)
    // await User.deleteMany({});
    // console.log('🗑️  Utilisateurs existants supprimés');

    // Créer les coiffeurs par défaut
    for (const stylistData of defaultStylists) {
      const existingUser = await User.findOne({ 
        $or: [{ username: stylistData.username }, { email: stylistData.email }] 
      });

      if (!existingUser) {
        const stylist = new User(stylistData);
        await stylist.save();
        console.log(`✅ Coiffeur créé: ${stylist.firstName} ${stylist.lastName} (${stylist.username})`);
      } else {
        console.log(`⚠️  Coiffeur déjà existant: ${stylistData.firstName} ${stylistData.lastName}`);
      }
    }

    console.log('\n🎉 Base de données initialisée avec succès !');
    console.log('\n👥 Comptes utilisateurs créés:');
    console.log('   • sarah.martin / password123 (Coiffeuse)');
    console.log('   • marie.dubois / password123 (Coiffeuse)');
    console.log('   • julie.rousseau / password123 (Coiffeuse)');
    console.log('   • antoine.bernard / password123 (Coiffeur)');
    console.log('   • admin / admin123 (Administrateur)');
    console.log('\n💡 Vous pouvez maintenant démarrer l\'application avec: npm run dev');

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Connexion MongoDB fermée');
    process.exit(0);
  }
}

// Exécuter le script si appelé directement
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
