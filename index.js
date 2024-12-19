import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import sequelize from './config/db.js'; // Database connection
import authRoutes from './routes/authRoutes.js'; // Router for authentication routes
import dashboardRoutes from './routes/dashboardRoutes.js';
import authenticateToken from './middleware/authMiddleware.js'; // Import authentication middleware
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Import associations to ensure all relationships are set up
import './models/associations.js';

// Setup for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express(); // Initialize app

// Middleware for parsing JSON, URL-encoded form data, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Apply cookie-parser globally
app.use(cors());

// View engine setup for EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files setup
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes); // Mount authentication routes
app.use('/dashboard', dashboardRoutes);


// Protected route for the dashboard
app.get('/dashboard', authenticateToken, (req, res) => {
  res.render('dashboard', { user: req.user });
});

// Render views for basic navigation
app.get('/', (req, res) => res.render('index'));
app.get('/signup', (req, res) => res.render('signup'));
app.get('/login', (req, res) => res.render('login'));

// Start server and synchronize database
const startServer = async () => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('Database connection successful.');

    // Synchronize all models (ensure associations are loaded first)
    await sequelize.sync({ alter: true }); // Use { alter: true } to update schema without dropping data
    console.log('Database synced successfully.');

    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
}

startServer();