const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware d'authentification
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'salon-secret-key');
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token invalide.' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide.' });
  }
};

// POST - Connexion utilisateur
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Trouver l'utilisateur
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }
    
    // Vérifier le mot de passe
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }
    
    // Créer le token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'salon-secret-key',
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Créer un nouvel utilisateur (admin seulement)
router.post('/register', auth, async (req, res) => {
  try {
    // Vérifier que l'utilisateur est admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé. Admin requis.' });
    }
    
    const user = new User(req.body);
    const savedUser = await user.save();
    
    // Retourner l'utilisateur sans le mot de passe
    const { password, ...userWithoutPassword } = savedUser.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Nom d\'utilisateur ou email déjà utilisé' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// GET - Récupérer le profil utilisateur
router.get('/profile', auth, async (req, res) => {
  res.json(req.user);
});

// GET - Récupérer tous les coiffeurs
router.get('/stylists', async (req, res) => {
  try {
    const stylists = await User.find({ role: 'stylist' }).select('-password');
    res.json(stylists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
