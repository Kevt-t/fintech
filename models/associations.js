import User from './user.js';
import Transaction from './transaction.js';

User.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { User, Transaction };