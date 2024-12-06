import { DataTypes } from 'sequelize';  // DataTypes for defining the model schema
import sequelize from '../config/db.js'; // Sequelize instance for DB connection
import bcrypt from 'bcrypt'; // For hashing passwords securely


const User = sequelize.define('User', { 
  username: {
    type: DataTypes.STRING,  // String type for username
    allowNull: false, // Username cannot be empty
    unique: true, // Ensure username is unique
  },
  email: {
    type: DataTypes.STRING, // String type for email
    allowNull: false, // Email cannot be empty
    unique: true, // Ensure email is unique
  },
  password: {
    type: DataTypes.STRING, // String type for password
    allowNull: false, // Password cannot be empty
  },
  balance: {
    type: DataTypes.FLOAT,  // Float type for the user's balance
    defaultValue: 0.0, // Default balance is 0.0
  },
});

// Hook before creating a user to hash the password securely
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10); // Generate salt for password hashing
  user.password = await bcrypt.hash(user.password, salt);  // Hash the password
});

// Exporting the User model to be used elsewhere in the app
export default User; 