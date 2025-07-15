import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import apiService from '../services/api'
import './Appointment.css'

const Appointment = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    stylist: '',
    date: '',
    time: '',
    notes: ''
  })
  const [availableSlots, setAvailableSlots] = useState([])
  const [stylists, setStylists] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const services = [
    { id: 'coupe', name: 'Coupe', duration: 60, price: 35 },
    { id: 'coloration', name: 'Coloration', duration: 120, price: 65 },
    { id: 'meches', name: 'Mèches', duration: 180, price: 85 },
    { id: 'brushing', name: 'Brushing', duration: 45, price: 25 },
    { id: 'shampoing', name: 'Shampoing', duration: 30, price: 15 },
    { id: 'coiffure-mariage', name: 'Coiffure Mariage', duration: 150, price: 120 }
  ]

  const defaultStylists = [
    { id: 'sarah', firstName: 'Sarah', lastName: 'Martin', specialties: ['coupe', 'coloration'] },
    { id: 'marie', firstName: 'Marie', lastName: 'Dubois', specialties: ['meches', 'coiffure-mariage'] },
    { id: 'julie', firstName: 'Julie', lastName: 'Rousseau', specialties: ['brushing', 'shampoing'] },
    { id: 'antoine', firstName: 'Antoine', lastName: 'Bernard', specialties: ['coupe', 'coloration'] }
  ]

  useEffect(() => {
    // Utiliser les coiffeurs par défaut si l'API n'est pas disponible
    setStylists(defaultStylists)
  }, [])

  useEffect(() => {
    if (formData.date && formData.stylist) {
      fetchAvailableSlots()
    }
  }, [formData.date, formData.stylist])

  const fetchAvailableSlots = async () => {
    try {
      setLoading(true)
      const slots = await apiService.getAvailableSlots(formData.date, formData.stylist)
      setAvailableSlots(slots)
    } catch (error) {
      // Créneaux par défaut si l'API n'est pas disponible
      const defaultSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
      ]
      setAvailableSlots(defaultSlots)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDateSelect = (selectInfo) => {
    const selectedDate = selectInfo.start
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      setError('Vous ne pouvez pas sélectionner une date passée')
      return
    }

    // Vérifier si c'est un dimanche (jour fermé)
    if (selectedDate.getDay() === 0) {
      setError('Le salon est fermé le dimanche')
      return
    }

    setError('')
    setFormData(prev => ({
      ...prev,
      date: selectedDate.toISOString().split('T')[0]
    }))
    
    if (step === 1) {
      setStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const appointmentData = {
        ...formData,
        date: new Date(formData.date)
      }
      
      await apiService.createAppointment(appointmentData)
      
      // Rediriger vers la page de confirmation avec les données
      navigate('/confirmation', { 
        state: { 
          appointment: appointmentData,
          service: services.find(s => s.id === formData.service),
          stylist: stylists.find(s => s.id === formData.stylist)
        } 
      })
    } catch (error) {
      setError('Erreur lors de la création du rendez-vous. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.date
      case 2:
        return formData.service && formData.stylist && formData.time
      case 3:
        return formData.firstName && formData.lastName && formData.email && formData.phone
      default:
        return false
    }
  }

  const getSelectedService = () => {
    return services.find(s => s.id === formData.service)
  }

  const getSelectedStylist = () => {
    return stylists.find(s => s.id === formData.stylist)
  }

  return (
    <div className="appointment">
      <div className="appointment-header">
        <h1>Prendre un Rendez-vous</h1>
        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span>1</span>
            <p>Date</p>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span>2</span>
            <p>Service</p>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span>3</span>
            <p>Informations</p>
          </div>
        </div>
      </div>

      <div className="appointment-content">
        {error && <div className="error-message">{error}</div>}

        {step === 1 && (
          <div className="step-content">
            <h2>Choisissez votre date</h2>
            <div className="calendar-container">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="fr"
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                select={handleDateSelect}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth'
                }}
                buttonText={{
                  today: 'Aujourd\'hui'
                }}
                height="auto"
                validRange={{
                  start: new Date().toISOString().split('T')[0]
                }}
                selectConstraint={{
                  daysOfWeek: [1, 2, 3, 4, 5, 6] // Lundi à Samedi
                }}
              />
            </div>
            {formData.date && (
              <div className="selected-date">
                <p>Date sélectionnée: {new Date(formData.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <button onClick={nextStep} className="btn-primary">
                  Continuer
                </button>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h2>Choisissez votre service et coiffeur</h2>
            
            <div className="form-section">
              <h3>Service souhaité</h3>
              <div className="services-grid">
                {services.map(service => (
                  <div
                    key={service.id}
                    className={`service-option ${formData.service === service.id ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, service: service.id }))}
                  >
                    <h4>{service.name}</h4>
                    <p>{service.duration} min</p>
                    <p className="price">{service.price}€</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h3>Coiffeur</h3>
              <div className="stylists-grid">
                {stylists.map(stylist => (
                  <div
                    key={stylist.id}
                    className={`stylist-option ${formData.stylist === stylist.id ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, stylist: stylist.id }))}
                  >
                    <h4>{stylist.firstName} {stylist.lastName}</h4>
                    <p>Spécialités: {stylist.specialties?.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>

            {formData.service && formData.stylist && (
              <div className="form-section">
                <h3>Heure disponible</h3>
                <div className="time-slots">
                  {loading ? (
                    <p>Chargement des créneaux...</p>
                  ) : (
                    availableSlots.map(slot => (
                      <button
                        key={slot}
                        className={`time-slot ${formData.time === slot ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, time: slot }))}
                      >
                        {slot}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            <div className="step-navigation">
              <button onClick={prevStep} className="btn-secondary">
                Retour
              </button>
              <button 
                onClick={nextStep} 
                className="btn-primary"
                disabled={!isStepValid()}
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h2>Vos informations</h2>
            
            <div className="appointment-summary">
              <h3>Récapitulatif</h3>
              <div className="summary-item">
                <strong>Date:</strong> {new Date(formData.date).toLocaleDateString('fr-FR')}
              </div>
              <div className="summary-item">
                <strong>Heure:</strong> {formData.time}
              </div>
              <div className="summary-item">
                <strong>Service:</strong> {getSelectedService()?.name} ({getSelectedService()?.price}€)
              </div>
              <div className="summary-item">
                <strong>Coiffeur:</strong> {getSelectedStylist()?.firstName} {getSelectedStylist()?.lastName}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="appointment-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Prénom *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Nom *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Téléphone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Notes (optionnel)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Informations complémentaires, demandes particulières..."
                />
              </div>

              <div className="step-navigation">
                <button type="button" onClick={prevStep} className="btn-secondary">
                  Retour
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={loading || !isStepValid()}
                >
                  {loading ? 'Confirmation...' : 'Confirmer le rendez-vous'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Appointment
