import express from 'express';
import User from '../models/user.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();



// Route to fetch balance and transaction history
router.get('/data', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { balance, transactions } = await user.getBalanceAndTransactions();
    res.status(200).json({ balance, transactions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

export default router;
