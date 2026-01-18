const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET = process.env.JWT_SECRET;

const users = []; // temporary array, replace with DB later

// Signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (User.findByEmail(email, users)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = await User.create(users.length + 1, email, password);
  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET, { expiresIn: '1h' });
  res.json({ token, message: 'Signup successful!' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = User.findByEmail(email, users);
  if (!user) return res.status(401).json({ message: 'Invalid email' });

  const isMatch = await user.verifyPassword(password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
  res.json({ token, message: 'Login successful!' });
});

module.exports = router;
