const express = require('express');
const { getExpenses, addExpense, getMonthlyStats } = require('../controllers/expenseController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').get(getExpenses).post(addExpense);
router.get('/stats', getMonthlyStats);

module.exports = router;