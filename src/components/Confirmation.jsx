import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import './Confirmation.css'

const Confirmation = () => {
  const location = useLocation()
  const { appointment, service, stylist } = location.state || {}

  useEffect(() => {
    // Envoyer un email de confirmation (optionnel)
    if (appointment && process.env.REACT_APP_EMAILJS_SERVICE_ID) {
      sendConfirmationEmail()
    }
  }, [appointment])

  const sendConfirmationEmail = async () => {
    try {
      const templateParams = {
        to_name: `${appointment.firstName} ${appointment.lastName}`,
        to_email: appointment.email,
        appointment_date: new Date(appointment.date).toLocaleDateString('fr-FR'),
        appointment_time: appointment.time,
        service_name: service?.name,
        stylist_name: `${stylist?.firstName} ${stylist?.lastName}`,
        salon_name: 'Salon Belle Allure',
        salon_phone: '01 23 45 67 89',
        salon_address: '123 Rue de la Beauté, 75001 Paris'
      }

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error)
    }
  }

  const addToGoogleCalendar = () => {
    if (!appointment) return

    const startDate = new Date(appointment.date)
    const [hours, minutes] = appointment.time.split(':')
    startDate.setHours(parseInt(hours), parseInt(minutes))
    
    const endDate = new Date(startDate)
    endDate.setMinutes(endDate.getMinutes() + (service?.duration || 60))

    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    const details = `
Rendez-vous au Salon Belle Allure
Service: ${service?.name}
Coiffeur: ${stylist?.firstName} ${stylist?.lastName}
Durée: ${service?.duration} minutes
Prix: ${service?.price}€

Adresse: 123 Rue de la Beauté, 75001 Paris
Téléphone: 01 23 45 67 89
    `.trim()

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Rendez-vous Salon Belle Allure')}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent('123 Rue de la Beauté, 75001 Paris')}`

    window.open(googleCalendarUrl, '_blank')
  }

  const addToOutlookCalendar = () => {
    if (!appointment) return

    const startDate = new Date(appointment.date)
    const [hours, minutes] = appointment.time.split(':')
    startDate.setHours(parseInt(hours), parseInt(minutes))
    
    const endDate = new Date(startDate)
    endDate.setMinutes(endDate.getMinutes() + (service?.duration || 60))

    const details = `Rendez-vous au Salon Belle Allure
Service: ${service?.name}
Coiffeur: ${stylist?.firstName} ${stylist?.lastName}
Durée: ${service?.duration} minutes
Prix: ${service?.price}€

Adresse: 123 Rue de la Beauté, 75001 Paris
Téléphone: 01 23 45 67 89`

    const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent('Rendez-vous Salon Belle Allure')}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent(details)}&location=${encodeURIComponent('123 Rue de la Beauté, 75001 Paris')}`

    window.open(outlookUrl, '_blank')
  }

  if (!appointment) {
    return (
      <div className="confirmation">
        <div className="confirmation-container">
          <div className="error-state">
            <h2>❌ Erreur</h2>
            <p>Aucune information de rendez-vous trouvée.</p>
            <Link to="/rendez-vous" className="btn-primary">
              Prendre un rendez-vous
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="confirmation">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">✅</div>
          <h1>Rendez-vous confirmé !</h1>
          <p>Merci {appointment.firstName}, votre rendez-vous a été enregistré avec succès.</p>
        </div>

        <div className="confirmation-details">
          <h2>Détails de votre rendez-vous</h2>
          
          <div className="details-grid">
            <div className="detail-item">
              <div className="detail-icon">📅</div>
              <div className="detail-content">
                <strong>Date</strong>
                <p>{new Date(appointment.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">⏰</div>
              <div className="detail-content">
                <strong>Heure</strong>
                <p>{appointment.time}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">✂️</div>
              <div className="detail-content">
                <strong>Service</strong>
                <p>{service?.name}</p>
                <small>{service?.duration} minutes - {service?.price}€</small>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">👩‍💼</div>
              <div className="detail-content">
                <strong>Coiffeur</strong>
                <p>{stylist?.firstName} {stylist?.lastName}</p>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon">👤</div>
              <div className="detail-content">
                <strong>Client</strong>
                <p>{appointment.firstName} {appointment.lastName}</p>
                <small>{appointment.email}</small>
                <small>{appointment.phone}</small>
              </div>
            </div>

            {appointment.notes && (
              <div className="detail-item full-width">
                <div className="detail-icon">📝</div>
                <div className="detail-content">
                  <strong>Notes</strong>
                  <p>{appointment.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="calendar-actions">
          <h3>Ajouter à votre calendrier</h3>
          <div className="calendar-buttons">
            <button onClick={addToGoogleCalendar} className="calendar-btn google">
              <span>📅</span>
              Google Calendar
            </button>
            <button onClick={addToOutlookCalendar} className="calendar-btn outlook">
              <span>📅</span>
              Outlook
            </button>
          </div>
        </div>

        <div className="important-info">
          <h3>Informations importantes</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>🏢 Adresse du salon</strong>
              <p>123 Rue de la Beauté<br />75001 Paris</p>
            </div>
            <div className="info-item">
              <strong>📞 Téléphone</strong>
              <p>01 23 45 67 89</p>
            </div>
            <div className="info-item">
              <strong>⚠️ Annulation</strong>
              <p>Merci de nous prévenir au moins 24h à l'avance en cas d'empêchement</p>
            </div>
            <div className="info-item">
              <strong>🚗 Parking</strong>
              <p>Parking public disponible à 2 minutes à pied</p>
            </div>
          </div>
        </div>

        <div className="confirmation-email">
          <div className="email-info">
            <span>📧</span>
            <p>Un email de confirmation a été envoyé à <strong>{appointment.email}</strong></p>
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/" className="btn-secondary">
            Retour à l'accueil
          </Link>
          <Link to="/rendez-vous" className="btn-primary">
            Prendre un autre rendez-vous
          </Link>
        </div>

        <div className="social-sharing">
          <h4>Partagez votre expérience</h4>
          <p>Nous serions ravis de connaître votre avis après votre visite !</p>
          <div className="social-buttons">
            <a 
              href="https://www.google.com/search?q=salon+belle+allure+avis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn"
            >
              ⭐ Laisser un avis Google
            </a>
            <a 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-btn"
            >
              📘 Suivre sur Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
