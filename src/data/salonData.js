// Données par défaut pour le salon de coiffure
export const salonData = {
  name: "Salon Belle Allure",
  description: "Votre beauté, notre passion",
  
  contact: {
    address: "123 Rue de la Beauté",
    city: "75001 Paris",
    phone: "01 23 45 67 89",
    email: "contact@salonbelleallure.fr",
    website: "https://salonbelleallure.fr"
  },
  
  schedule: {
    weekdays: {
      start: "09:00",
      end: "18:00"
    },
    saturday: {
      start: "09:00", 
      end: "17:00"
    },
    sunday: "closed"
  },
  
  services: [
    {
      id: 'coupe',
      name: 'Coupe',
      description: 'Coupe personnalisée selon votre style et la forme de votre visage',
      duration: 60,
      price: 35,
      icon: '✂️',
      category: 'coiffure'
    },
    {
      id: 'coloration',
      name: 'Coloration',
      description: 'Coloration complète avec produits professionnels de qualité',
      duration: 120,
      price: 65,
      icon: '🎨',
      category: 'coloration'
    },
    {
      id: 'meches',
      name: 'Mèches',
      description: 'Mèches et balayage pour sublimer et éclaircir vos cheveux',
      duration: 180,
      price: 85,
      icon: '🌟',
      category: 'coloration'
    },
    {
      id: 'brushing',
      name: 'Brushing',
      description: 'Mise en forme et brushing professionnel pour un look parfait',
      duration: 45,
      price: 25,
      icon: '💇‍♀️',
      category: 'coiffure'
    },
    {
      id: 'shampoing',
      name: 'Shampoing',
      description: 'Lavage avec soins adaptés à votre type de cheveux',
      duration: 30,
      price: 15,
      icon: '🧴',
      category: 'soin'
    },
    {
      id: 'coiffure-mariage',
      name: 'Coiffure Mariage',
      description: 'Coiffure élégante et sophistiquée pour votre jour J',
      duration: 150,
      price: 120,
      icon: '👰',
      category: 'événement'
    }
  ],
  
  stylists: [
    {
      id: 'sarah',
      firstName: 'Sarah',
      lastName: 'Martin',
      title: 'Directrice Artistique',
      specialties: ['coupe', 'coloration', 'coiffure-mariage'],
      experience: '10 ans d\'expérience',
      description: 'Passionnée par les coupes tendances et la coloration créative',
      avatar: '👩‍🦰'
    },
    {
      id: 'marie',
      firstName: 'Marie',
      lastName: 'Dubois',
      title: 'Spécialiste Coloration',
      specialties: ['meches', 'coloration', 'coiffure-mariage'],
      experience: '8 ans d\'expérience',
      description: 'Experte en techniques de mèches et balayage naturel',
      avatar: '👩‍🦱'
    },
    {
      id: 'julie',
      firstName: 'Julie',
      lastName: 'Rousseau',
      title: 'Coiffeuse Styliste',
      specialties: ['coupe', 'brushing', 'shampoing'],
      experience: '6 ans d\'expérience',
      description: 'Spécialisée dans les coupes modernes et le styling',
      avatar: '👩‍🦳'
    },
    {
      id: 'antoine',
      firstName: 'Antoine',
      lastName: 'Bernard',
      title: 'Coiffeur Barbier',
      specialties: ['coupe', 'coloration'],
      experience: '12 ans d\'expérience',
      description: 'Expert en coupes masculines et techniques de barbier',
      avatar: '👨‍🦲'
    }
  ],
  
  testimonials: [
    {
      id: 1,
      name: 'Sophie L.',
      rating: 5,
      date: '2025-01-10',
      text: 'Excellente expérience ! Sarah a parfaitement compris ce que je voulais. Le résultat dépasse mes attentes. Salon chaleureux et professionnel.',
      service: 'Coupe + Coloration',
      stylist: 'Sarah'
    },
    {
      id: 2,
      name: 'Marie D.',
      rating: 5,
      date: '2025-01-08',
      text: 'Salon chaleureux et équipe professionnelle. Mes cheveux n\'ont jamais été aussi beaux ! Je recommande vivement.',
      service: 'Mèches',
      stylist: 'Marie'
    },
    {
      id: 3,
      name: 'Camille R.',
      rating: 5,
      date: '2025-01-05',
      text: 'Service impeccable et résultat au-delà de mes attentes. L\'équipe est à l\'écoute et très compétente. Mon salon de référence !',
      service: 'Coiffure Mariage',
      stylist: 'Sarah'
    },
    {
      id: 4,
      name: 'Thomas M.',
      rating: 5,
      date: '2025-01-03',
      text: 'Antoine est un vrai professionnel. Coupe parfaite, conseils avisés. Atmosphere détendue et conviviale.',
      service: 'Coupe Homme',
      stylist: 'Antoine'
    },
    {
      id: 5,
      name: 'Léa B.',
      rating: 5,
      date: '2024-12-28',
      text: 'Julie a transformé mes cheveux ! Brushing parfait qui a tenu toute la semaine. Service rapide et efficace.',
      service: 'Brushing',
      stylist: 'Julie'
    }
  ],
  
  features: [
    {
      icon: '🏆',
      title: 'Expertise Reconnue',
      description: 'Équipe formée aux dernières techniques et tendances internationales'
    },
    {
      icon: '🌿',
      title: 'Produits Naturels',
      description: 'Produits professionnels respectueux de vos cheveux et de l\'environnement'
    },
    {
      icon: '⏰',
      title: 'Prise de RDV Simple',
      description: 'Réservation en ligne 24h/24 avec confirmation immédiate'
    },
    {
      icon: '✨',
      title: 'Conseil Personnalisé',
      description: 'Analyse gratuite de vos cheveux et conseils sur-mesure'
    },
    {
      icon: '💎',
      title: 'Ambiance Premium',
      description: 'Cadre moderne et relaxant pour un moment de détente unique'
    },
    {
      icon: '🎯',
      title: 'Satisfaction Garantie',
      description: 'Retouches gratuites dans les 7 jours si vous n\'êtes pas satisfait(e)'
    }
  ],
  
  socialMedia: {
    facebook: 'https://facebook.com/salonbelleallure',
    instagram: 'https://instagram.com/salonbelleallure',
    google: 'https://www.google.com/search?q=salon+belle+allure+avis'
  }
}

export default salonData
