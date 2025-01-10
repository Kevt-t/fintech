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

export default sequelize;