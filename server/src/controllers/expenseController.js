const Expense = require('../models/Expense');

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addExpense = async (req, res) => {
  try {
    const { category, amount, description } = req.body;
    
    const expense = await Expense.create({
      userId: req.user._id,
      category,
      amount,
      description
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMonthlyStats = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const monthlyExpenses = await Expense.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: {
            $gte: new Date(currentYear, currentMonth, 1),
            $lt: new Date(currentYear, currentMonth + 1, 1)
          }
        }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    const totalExpenses = monthlyExpenses.reduce((sum, item) => sum + item.total, 0);
    const remainingBalance = req.user.salary - totalExpenses;
    const balancePercentage = (remainingBalance / req.user.salary) * 100;

    res.json({
      monthlyExpenses,
      totalExpenses,
      remainingBalance,
      balancePercentage,
      salary: req.user.salary
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getExpenses, addExpense, getMonthlyStats };