import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const services = [
    {
      name: 'Coupe',
      description: 'Coupe personnalisée selon votre style',
      price: 'À partir de 35€',
      icon: '✂️'
    },
    {
      name: 'Coloration',
      description: 'Coloration complète avec produits professionnels',
      price: 'À partir de 65€',
      icon: '🎨'
    },
    {
      name: 'Mèches',
      description: 'Mèches et balayage pour sublimer vos cheveux',
      price: 'À partir de 85€',
      icon: '🌟'
    },
    {
      name: 'Brushing',
      description: 'Mise en forme et brushing professionnel',
      price: 'À partir de 25€',
      icon: '💇‍♀️'
    },
    {
      name: 'Coiffure Mariage',
      description: 'Coiffure élégante pour votre jour J',
      price: 'À partir de 120€',
      icon: '👰'
    }
  ]

  const testimonials = [
    {
      name: 'Sophie L.',
      text: 'Excellente expérience ! Sarah a parfaitement compris ce que je voulais. Je recommande vivement !',
      rating: 5
    },
    {
      name: 'Marie D.',
      text: 'Salon chaleureux et équipe professionnelle. Mes cheveux n\'ont jamais été aussi beaux !',
      rating: 5
    },
    {
      name: 'Camille R.',
      text: 'Service impeccable et résultat au-delà de mes attentes. Merci à toute l\'équipe !',
      rating: 5
    }
  ]

  const renderStars = (rating) => {
    return '⭐'.repeat(rating)
  }

  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="logo">
            <h1>✨ Salon Belle Allure</h1>
          </div>
          <div className="nav-links">
            <a href="#services">Nos Services</a>
            <a href="#testimonials">Témoignages</a>
            <Link to="/rendez-vous" className="cta-button">
              Prendre Rendez-vous
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Révélez votre beauté naturelle</h2>
          <p>
            Bienvenue dans notre salon de coiffure moderne où passion et expertise 
            se rencontrent pour sublimer votre style unique.
          </p>
          <div className="hero-buttons">
            <Link to="/rendez-vous" className="btn-primary">
              Réserver maintenant
            </Link>
            <a href="#services" className="btn-secondary">
              Découvrir nos services
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="placeholder-image">
            📸 Image du salon
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="container">
          <h2>À propos de nous</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Depuis plus de 10 ans, notre salon de coiffure vous accueille dans un cadre 
                moderne et chaleureux. Notre équipe de professionnels passionnés met tout 
                en œuvre pour vous offrir des prestations de qualité supérieure.
              </p>
              <div className="features">
                <div className="feature">
                  <span className="feature-icon">🏆</span>
                  <h4>Expertise Reconnue</h4>
                  <p>Équipe formée aux dernières techniques</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">🌿</span>
                  <h4>Produits Naturels</h4>
                  <p>Produits professionnels respectueux</p>
                </div>
                <div className="feature">
                  <span className="feature-icon">⏰</span>
                  <h4>Prise de RDV Simple</h4>
                  <p>Réservation en ligne 24h/24</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2>Nos Services</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="service-price">{service.price}</div>
              </div>
            ))}
          </div>
          <div className="services-cta">
            <Link to="/rendez-vous" className="btn-primary">
              Réserver votre service
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <h2>Ce que disent nos clients</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
                <p>"{testimonial.text}"</p>
                <div className="testimonial-author">
                  - {testimonial.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <div className="container">
          <h2>Nous Contacter</h2>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <h4>Adresse</h4>
                <p>123 Rue de la Beauté<br />75001 Paris</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <h4>Téléphone</h4>
                <p>01 23 45 67 89</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">⏰</span>
              <div>
                <h4>Horaires</h4>
                <p>Lun-Sam: 9h-18h<br />Dimanche: Fermé</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <h4>Email</h4>
                <p>contact@salonbelleallure.fr</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Salon Belle Allure</h3>
              <p>Votre beauté, notre passion</p>
            </div>
            <div className="footer-section">
              <h4>Liens Utiles</h4>
              <ul>
                <li><a href="#services">Nos Services</a></li>
                <li><Link to="/rendez-vous">Prendre RDV</Link></li>
                <li><a href="#testimonials">Avis Clients</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>📞 01 23 45 67 89</p>
              <p>✉️ contact@salonbelleallure.fr</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Salon Belle Allure. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
