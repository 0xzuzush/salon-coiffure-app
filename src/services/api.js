import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const apiService = {
  // Gestion des rendez-vous
  async getAppointments(filters = {}) {
    try {
      const response = await api.get('/appointments', { params: filters })
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous:', error)
      throw error
    }
  },

  async getAvailableSlots(date, stylist) {
    try {
      const response = await api.get('/appointments/available-slots', {
        params: { date, stylist }
      })
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des créneaux:', error)
      // Retourner des créneaux par défaut en cas d'erreur
      return [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
      ]
    }
  },

  async createAppointment(appointmentData) {
    try {
      const response = await api.post('/appointments', appointmentData)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la création du rendez-vous:', error)
      throw error
    }
  },

  async updateAppointment(id, appointmentData) {
    try {
      const response = await api.put(`/appointments/${id}`, appointmentData)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rendez-vous:', error)
      throw error
    }
  },

  async deleteAppointment(id) {
    try {
      const response = await api.delete(`/appointments/${id}`)
      return response.data
    } catch (error) {
      console.error('Erreur lors de la suppression du rendez-vous:', error)
      throw error
    }
  },

  // Gestion des utilisateurs/coiffeurs
  async login(credentials) {
    try {
      const response = await api.post('/users/login', credentials)
      const { token, user } = response.data
      
      // Stocker le token dans localStorage
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(user))
      
      return { token, user }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      throw error
    }
  },

  async logout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  async getProfile() {
    try {
      const response = await api.get('/users/profile')
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error)
      throw error
    }
  },

  async getStylists() {
    try {
      const response = await api.get('/users/stylists')
      return response.data
    } catch (error) {
      console.error('Erreur lors de la récupération des coiffeurs:', error)
      // Retourner des coiffeurs par défaut en cas d'erreur
      return [
        { id: 'sarah', firstName: 'Sarah', lastName: 'Martin', specialties: ['coupe', 'coloration'] },
        { id: 'marie', firstName: 'Marie', lastName: 'Dubois', specialties: ['meches', 'coiffure-mariage'] },
        { id: 'julie', firstName: 'Julie', lastName: 'Rousseau', specialties: ['brushing', 'shampoing'] },
        { id: 'antoine', firstName: 'Antoine', lastName: 'Bernard', specialties: ['coupe', 'coloration'] }
      ]
    }
  },

  // Utilitaires
  getCurrentUser() {
    try {
      const user = localStorage.getItem('user')
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error)
      return null
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('authToken')
  },

  // Validation des données
  validateAppointmentData(data) {
    const errors = []
    
    if (!data.firstName?.trim()) {
      errors.push('Le prénom est requis')
    }
    
    if (!data.lastName?.trim()) {
      errors.push('Le nom est requis')
    }
    
    if (!data.email?.trim()) {
      errors.push('L\'email est requis')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('L\'email n\'est pas valide')
    }
    
    if (!data.phone?.trim()) {
      errors.push('Le téléphone est requis')
    } else if (!/^(\+33|0)[1-9](\d{8})$/.test(data.phone.replace(/\s/g, ''))) {
      errors.push('Le numéro de téléphone n\'est pas valide')
    }
    
    if (!data.service) {
      errors.push('Le service est requis')
    }
    
    if (!data.stylist) {
      errors.push('Le coiffeur est requis')
    }
    
    if (!data.date) {
      errors.push('La date est requise')
    } else {
      const appointmentDate = new Date(data.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (appointmentDate < today) {
        errors.push('La date ne peut pas être dans le passé')
      }
      
      if (appointmentDate.getDay() === 0) {
        errors.push('Le salon est fermé le dimanche')
      }
    }
    
    if (!data.time) {
      errors.push('L\'heure est requise')
    }
    
    return errors
  },

  // Formatage des données
  formatAppointmentForDisplay(appointment) {
    return {
      ...appointment,
      formattedDate: new Date(appointment.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      formattedDateTime: `${new Date(appointment.date).toLocaleDateString('fr-FR')} à ${appointment.time}`
    }
  }
}

export default apiService
