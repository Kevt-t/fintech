import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js'; // Sequelize instance
import { signUp, login } from './routes/authRoutes.js'; // Authentication handlers
import { deposit, withdraw } from './routes/transactionRoutes.js'; // Transaction handlers
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Setup for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// View engine setup for EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files setup (optional, for serving assets like CSS or JS)
app.use(express.static(path.join(__dirname, 'public')));

// Define root route to render the index.ejs file
app.get('/', (req, res) => {
  res.render('index'); // Render views/index.ejs
});

// Render signup.ejs for GET /signup
app.get('/signup', (req, res) => {
  res.render('signup'); // Render views/signup.ejs
});

// Render login.ejs for GET /login
app.get('/login', (req, res) => {
  res.render('login'); // Render views/login.ejs
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard'); // Render views/dashboard.ejs
});


// Handle POST requests for signup
app.post('/signup', signUp);

// Handle POST requests for login
app.post('/login', login);

// Transaction routes
app.post('/deposit', deposit);
app.post('/withdraw', withdraw);

// Sync Sequelize models and start the server
(async () => {
  try {
    // Authenticate and sync the database
    await sequelize.authenticate();
    console.log('Database connected...');
    await sequelize.sync();
    console.log('Database synced...');
    
    // Start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}...`);
    });
  } catch (error) {
    console.error('Error initializing app:', error);
  }
})();
