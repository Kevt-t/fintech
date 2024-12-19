import { Sequelize } from 'sequelize';  // Sequelize for interacting with MySQL
import dotenv from 'dotenv'; // To load environment variables from the .env file

// Load environment variables from .env
dotenv.config();

// Create Sequelize instance with MySQL configuration
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Disable verbose logging in production for cleaner output
  }
);

// Centralized function to connect to the database (optional)
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit the application if DB connection fails
  }
};

// Export the sequelize instance and optional connection function
export { sequelize, connectToDatabase };
export default sequelize;