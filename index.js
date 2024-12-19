import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js'; // Database connection
import authRoutes from './routes/authRoutes.js'; // Router for authentication routes
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Setup for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// View engine setup for EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files setup (optional, for serving assets like CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes); // Mount authentication routes

// Render views for basic navigation
app.get('/', (req, res) => res.render('index'));
app.get('/signup', (req, res) => res.render('signup')); // GET /signup renders signup.ejs
app.get('/login', (req, res) => res.render('login')); // GET /login renders login.ejs
app.get('/dashboard', (req, res) => res.render('dashboard')); // GET /dashboard renders dashboard.ejs

// Start server and synchronize database
const startServer = async () => {
  try {
    await sequelize.sync(); // Synchronize Sequelize models with the database
    console.log('Database synced successfully.');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit on failure
  }
};

startServer();
