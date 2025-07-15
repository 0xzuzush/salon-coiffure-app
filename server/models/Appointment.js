const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  service: {
    type: String,
    required: true,
    enum: ['coupe', 'coloration', 'meches', 'brushing', 'shampoing', 'coiffure-mariage']
  },
  stylist: {
    type: String,
    required: true,
    enum: ['sarah', 'marie', 'julie', 'antoine']
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['confirme', 'en-attente', 'annule'],
    default: 'en-attente'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index pour optimiser les recherches par date et coiffeur
appointmentSchema.index({ date: 1, stylist: 1 });
appointmentSchema.index({ email: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
