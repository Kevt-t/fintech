import bcrypt from 'bcrypt'; // To compare the hashed passwords
import jwt from 'jsonwebtoken'; // To generate JWT tokens
import User from '../models/user.js';  // Importing User model to interact with the User table

// Sign up route handler 
const signUp = async (req, res) => {
  const { username, email, password } = req.body;  // Destructuring request body for username, email, and password
  try {
// Creating a new user in the database
    const newUser = await User.create({ username, email, password });
    res.status(201).json(newUser); // Responding with the newly created user
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user', error });  // Error handling
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body; // Destructuring request body for email and password 
  
  try {
  // Finding the user by email in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });  // If user doesn't exist
    }

// Comparing the provided password with the hashed password in the database
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

// Generating a JWT token for the authenticated user
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Exporting the routes for use in other parts of the application
export { signUp, login };
