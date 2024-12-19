import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

// Sign up route
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

    // Check for existing user
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send('Email is already registered.');
    }

    // Create user and hash password (done via Sequelize hook)
    await User.create({ username, email, password });

    // Redirect to login page
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
    // Validate input
    if (!email || !password) {
      return res.status(400).send('All fields are required.');
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Validate password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).send('Invalid credentials.');
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Redirect to dashboard or send token
    res.redirect('/dashboard'); // Option 1: Redirect for form-based flow
    // res.json({ message: 'Login successful', token }); // Option 2: Send token for API-based flow
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error.');
  }
});

export default router;
