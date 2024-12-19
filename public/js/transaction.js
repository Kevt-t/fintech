// Importing required dependencies
  import User from '../models/user.js';  // Importing User model to interact with the User table
  import Transaction from '../models/transaction.js'; // Importing Transaction model to log transactions


  // Deposit route handler
  const deposit = async (req, res) => { 
    const { userId, amount } = req.body; // Destructuring request body for user ID and deposit amount

    try {
  // Finding the user by userId
      const user = await User.findByPk(userId); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

  // Adding the deposit amount to the user's balance
      user.balance += amount;
      await user.save();

  // Creating a transaction record for the deposit
      await Transaction.create({
        userId,
        amount,
        type: 'deposit', // The type of transaction is 'deposit'
      });

      res.status(200).json({ message: 'Deposit successful', balance: user.balance }); // if successful
    } catch (error) {
      res.status(500).json({ message: 'Error making deposit', error }); // if failure
    }
  };

  // Withdraw route handler
  const withdraw = async (req, res) => { 
    const { userId, amount } = req.body; // Destructuring request body for user ID and withdrawal amount

    try {
      // Finding the user by userId
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' }); // If user doesn't exist
      }

      // Checking if the user has sufficient balance
      if (user.balance < amount) {
        return res.status(400).json({ message: 'Insufficient funds' }); // If not enough balance
      }

          
      // Subtracting the withdrawal amount from the user's balance
      user.balance -= amount; 
      await user.save();  // Saving the updated balance to the database


      // Creating a transaction record for the withdrawal
      await Transaction.create({
        userId,
        amount,
        type: 'withdraw', // The type of transaction is 'withdraw'
      });

      res.status(200).json({ message: 'Withdrawal successful', balance: user.balance }); // If successful
    } catch (error) {
      res.status(500).json({ message: 'Error making withdrawal', error }); //If failure
    }
  };

  // Exporting the routes for use in other parts of the application
  export { deposit, withdraw };