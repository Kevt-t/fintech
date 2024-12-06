// Importing required dependencies
import express from 'express';  // Express for routing
import dotenv from 'dotenv'; // dotenv for loading environment variables
import sequelize from './config/db.js';  // Sequelize instance for DB connection
import { signUp, login } from './routes/authRoutes.js'; // Authentication routes
import { deposit, withdraw } from './routes/transactionRoutes.js'; // Transaction routes

import cors from 'cors';  // Import CORS package

dotenv.config();
const app = express();

// Enable CORS for frontend access
app.use(cors());  // Allows requests from any origin (you can configure it more specifically if needed)

app.use(express.json());  // for parsing application/json

// User authentication routes
app.post('/signup', signUp);  // Sign up route
app.post('/login', login);  // Login route

// Transaction routes
app.post('/deposit', deposit);  // Deposit route
app.post('/withdraw', withdraw);  // Withdraw route

// Sync Sequelize models and start the server
await sequelize.sync();

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000...');
});
