const Expense = require('../models/Expense');
const mongoose = require('mongoose');

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    res.json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
};

const getExpenseStats = async (req, res) => {
  try {
    console.log('Getting expense stats for user:', req.user._id);
    
    // Check if user exists and has valid ObjectId
    if (!req.user || !req.user._id) {
      console.error('Invalid user object:', req.user);
      return res.status(400).json({ message: 'Invalid user information' });
    }

    // Validate that the user ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      console.error('Invalid ObjectId format:', req.user._id);
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const stats = await Expense.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user._id) } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('Stats retrieved successfully:', stats);
    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      user: req.user ? req.user._id : 'undefined'
    });
    res.status(500).json({ 
      message: 'Error fetching expense statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

const addExpense = async (req, res) => {
  try {
    const { category, amount, description } = req.body;
    
    if (!category || !amount) {
      return res.status(400).json({ message: 'Category and amount are required' });
    }

    const expense = await Expense.create({
      user: req.user._id,
      category,
      amount: Number(amount),
      description
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error('Add expense error:', error);
    res.status(500).json({ message: 'Error adding expense' });
  }
};

module.exports = { getExpenses, addExpense, getExpenseStats };