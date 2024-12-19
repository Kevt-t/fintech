import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Transaction = sequelize.define('Transaction', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0.01, // Ensure transaction amount is positive
    },
  },
  type: {
    type: DataTypes.ENUM('deposit', 'withdraw','expense'),
    allowNull: false,
  },
});

export default Transaction;
