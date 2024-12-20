import express from 'express';
import { Transaction, User } from '../models/associations.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a transaction
router.post('/', authenticateToken, async (req, res) => {
  const { amount, type } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).send('User not found.');

    // Ensure balance is treated as a number
    let currentBalance = parseFloat(user.balance);

    if (type === 'withdraw' || type === 'expense') {
      if (currentBalance < amount) return res.status(400).send('Insufficient balance.');
      currentBalance -= parseFloat(amount);
    } else if (type === 'deposit') {
      currentBalance += parseFloat(amount);
    }

    user.balance = currentBalance;
    const transaction = await Transaction.create({ amount, type, userId });
    await user.save(); // Save the updated balance

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).send('Internal server error.');
  }
});



// Fetch transaction history
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findByPk(userId, {
      include: { model: Transaction, as: 'transactions', order: [['createdAt', 'DESC']] },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ balance: user.balance, transactions: user.transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
