import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.js';

const Transaction = sequelize.define('Transaction', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0.01, // Ensure transaction amount is greater than zero
    },
  },
  type: {
    type: DataTypes.ENUM('deposit', 'withdraw'),
    allowNull: false,
  },
});

export default Transaction;
