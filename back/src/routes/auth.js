const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'secret_key'; // faudra la décaler en .env

router.post('/login', async (req, res) => {
    const { name, password } = req.body;

    try {
      // Vérifier si l'utilisateur existe
      const user = await User.findOne({ where: { name } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Comparer les mots de passe avec bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Si tout est correct, générer un JWT (c'est un token qui sera utile pour le front)
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  
      // Renvoyer le token au frontend
      return res.status(200).json({ token });
    } catch (error) {
      console.log('Login error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  module.exports = router;