const express = require('express');
const { getExpenses, addExpense, getExpenseStats } = require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').get(getExpenses).post(addExpense);
router.get('/stats', getExpenseStats);

module.exports = router;