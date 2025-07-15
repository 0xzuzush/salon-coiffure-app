const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const nodemailer = require('nodemailer');

// Configuration de nodemailer (à adapter avec vos paramètres SMTP)
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// GET - Récupérer tous les rendez-vous
router.get('/', async (req, res) => {
  try {
    const { date, stylist } = req.query;
    let filter = {};
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }
    
    if (stylist) {
      filter.stylist = stylist;
    }
    
    const appointments = await Appointment.find(filter).sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Récupérer les créneaux disponibles pour une date et un coiffeur
router.get('/available-slots', async (req, res) => {
  try {
    const { date, stylist } = req.query;
    
    if (!date || !stylist) {
      return res.status(400).json({ message: 'Date et coiffeur requis' });
    }
    
    // Créneaux de base (à adapter selon les horaires du salon)
    const baseSlots = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];
    
    // Récupérer les rendez-vous existants pour cette date et ce coiffeur
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);
    
    const existingAppointments = await Appointment.find({
      date: { $gte: startDate, $lt: endDate },
      stylist: stylist,
      status: { $ne: 'annule' }
    });
    
    const bookedSlots = existingAppointments.map(apt => apt.time);
    const availableSlots = baseSlots.filter(slot => !bookedSlots.includes(slot));
    
    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Créer un nouveau rendez-vous
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const savedAppointment = await appointment.save();
    
    // Envoyer email de confirmation (optionnel)
    if (process.env.SMTP_USER) {
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: appointment.email,
        subject: 'Confirmation de votre rendez-vous - Salon de Coiffure',
        html: `
          <h2>Confirmation de rendez-vous</h2>
          <p>Bonjour ${appointment.firstName} ${appointment.lastName},</p>
          <p>Votre rendez-vous a été confirmé pour :</p>
          <ul>
            <li><strong>Date :</strong> ${new Date(appointment.date).toLocaleDateString('fr-FR')}</li>
            <li><strong>Heure :</strong> ${appointment.time}</li>
            <li><strong>Service :</strong> ${appointment.service}</li>
            <li><strong>Coiffeur :</strong> ${appointment.stylist}</li>
          </ul>
          <p>Nous vous attendons avec plaisir !</p>
          <p>L'équipe du Salon de Coiffure</p>
        `
      };
      
      await transporter.sendMail(mailOptions);
    }
    
    res.status(201).json(savedAppointment);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Ce créneau est déjà réservé' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// PUT - Mettre à jour un rendez-vous
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!appointment) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }
    
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Supprimer un rendez-vous
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }
    
    res.json({ message: 'Rendez-vous supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
