import { Sequelize } from 'sequelize';  // Sequelize for interacting with MySQL
import dotenv from 'dotenv'; // To load environment variables from the .env file

// Loading environment variables from .env
dotenv.config();

// Setting up Sequelize instance with MySQL configuration
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

// Test the connection to ensure that Sequelize can communicate with the database
try {
  await sequelize.authenticate();
  console.log('Database connected...');
} catch (err) {
  console.error('Error connecting to database:', err);
}

// Export the sequelize instance to be used elsewhere in the app
export default sequelize;
