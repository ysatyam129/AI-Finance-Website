# AI Finance Website

A full-stack personal finance tracker with expense management, visual analytics, and email notifications.

## 🚀 Live Demo
[Visit AI Finance Website](https://your-vercel-url.vercel.app)

## ✨ Features

- 🔐 User Authentication (Login/Register)
- 📊 Interactive Dashboard with Charts (Recharts)
- 💰 Expense Tracking by Categories
- 📧 Email Notifications when balance < 10%
- 📱 Responsive Design (Tailwind CSS + shadcn/ui)
- 🎯 Real-time Balance Monitoring
- 🔔 Toast & Sonner Notifications
- 📈 Visual Analytics with Framer Motion

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Axios** - API calls

### Backend
- **Node.js + Express** - Server
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **Nodemailer** - Email service
- **Cron** - Scheduled tasks

## 🚀 Deployment

### Vercel (Frontend)
1. Connect your GitHub repository to Vercel
2. Set Root Directory to `client`
3. Build Command: `npm run build`
4. Output Directory: `.next`

### Railway/Render (Backend)
1. Deploy server folder separately
2. Set environment variables
3. Use `npm start` as start command

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or cloud)
- Gmail account (for email notifications)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ysatyam129/AI-Finance-Website.git
cd AI-Finance-Website
```

2. **Setup Backend**
```bash
cd server
npm install
```

3. **Setup Frontend**
```bash
cd ../client
npm install
```

4. **Configure Environment**
```bash
# In server/.env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
```

5. **Start the Application**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

6. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📱 Usage

1. **Register/Login** - Create account with salary information
2. **Dashboard** - View expense analytics and balance
3. **Add Expenses** - Track spending by categories
4. **Email Alerts** - Automatic notifications when balance < 10%
5. **Sample Data** - Use seed API to add sample expenses
6. **Interactive Cards** - Click on dashboard cards for detailed views

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Expenses
- `GET /api/expenses` - Get user expenses
- `POST /api/expenses` - Add new expense
- `GET /api/expenses/stats` - Get monthly statistics

### Utilities
- `POST /api/seed/expenses` - Add sample expenses

## 📧 Email Configuration

1. Enable 2-factor authentication in Gmail
2. Generate App Password
3. Use App Password in EMAIL_PASS environment variable

## 📁 Project Structure

```
AI-Finance-Website/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context
│   │   └── lib/          # Utilities
│   └── package.json
├── server/                # Express Backend
│   ├── src/
│   │   ├── config/       # Database & email config
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Route handlers
│   │   └── utils/        # Helper functions
│   └── package.json
├── vercel.json            # Vercel configuration
├── package.json           # Root package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Satyam Yadav**
- GitHub: [@ysatyam129](https://github.com/ysatyam129)

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern fintech applications
- Built with love and coffee ☕