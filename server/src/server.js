require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('cron');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const seedRoutes = require('./routes/seedRoutes');
const { checkLowBalance } = require('./utils/checkBalance');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/seed', seedRoutes);
app.get('/test',(req,res)=>{
  return res.send("API is running....")
})

// Schedule balance check every day at 9 AM
const job = new cron.CronJob('0 9 * * *', checkLowBalance);
job.start();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});