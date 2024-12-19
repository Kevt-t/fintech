import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensure the email format is valid
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
});

//Method to get user balance as well as transactions
User.prototype.getBalanceAndTransactions = async function () {
  const transactions = await this.getTransactions({ order: [['createdAt', 'DESC']] });
  return { balance: this.balance, transactions };
};

// Hook for hashing the password before saving
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Instance method for password validation
User.prototype.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export default User;
