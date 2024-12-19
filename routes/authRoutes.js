import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).send('All fields are required.');
    }

    if (password.length < 8) {
      return res.status(400).send('Password must be at least 8 characters long.');
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send('Email is already registered.');
    }

    // Create a new user (password hashing is handled by Sequelize hook)
    await User.create({ username, email, password });

    // Redirect to the login page
    res.redirect('/login');
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Internal server error.');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send('All fields are required.');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send('User not found.');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).send('Invalid credentials.');
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    // Store token in an HTTP-only cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // Token expires in 1 hour
    });

    // Redirect to the dashboard
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error.');
  }
});

export default router; // Default export
