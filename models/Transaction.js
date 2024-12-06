// Importing required dependencies
import { DataTypes } from 'sequelize'; // DataTypes for defining the model schema
import sequelize from '../config/db.js';  // Sequelize instance for DB connection

// Defining the 'Transaction' model to log deposits and withdrawals
const Transaction = sequelize.define('Transaction', {
  amount: { 
    type: DataTypes.FLOAT,  // Amount of transaction (float type)
    allowNull: false, // Amount cannot be empty
  },
  type: {
    type: DataTypes.ENUM('deposit', 'withdraw'), // Enum for transaction type (either deposit or withdraw)
    allowNull: false,  // Type cannot be null
  },
  userId: {
    type: DataTypes.INTEGER,  // Integer for user ID associated with the transaction
    allowNull: false, // User ID cannot be null
  },
});

// Exporting the Transaction model to be used elsewhere in the app
export default Transaction;
