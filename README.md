# AI Finance Web Application

A full-stack personal finance tracker with expense management, visual analytics, and email notifications.

## Features

- 🔐 User Authentication (Login/Register)
- 📊 Interactive Dashboard with Charts (Recharts)
- 💰 Expense Tracking by Categories
- 📧 Email Notifications when balance < 10%
- 📱 Responsive Design (Tailwind CSS + shadcn/ui)
- 🎯 Real-time Balance Monitoring

## Tech Stack

### Frontend

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Recharts** - Data visualization
- **Axios** - API calls

### Backend

- **Node.js + Express** - Server
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **Nodemailer** - Email service
- **Cron** - Scheduled tasks

## Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud)
- Gmail account (for email notifications)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd aifinance_web
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

## Usage

1. **Register/Login** - Create account with salary information
2. **Dashboard** - View expense analytics and balance
3. **Add Expenses** - Track spending by categories
4. **Email Alerts** - Automatic notifications when balance < 10%
5. **Sample Data** - Use seed API to add sample expenses

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Expenses

- `GET /api/expenses` - Get user expenses
- `POST /api/expenses` - Add new expense
- `GET /api/expenses/stats` - Get monthly statistics

### Utilities

- `POST /api/seed/expenses` - Add sample expenses

## Email Configuration

1. Enable 2-factor authentication in Gmail
2. Generate App Password
3. Use App Password in EMAIL_PASS environment variable

## Project Structure

```
aifinance_web/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # Reusable components
│   │   ├── lib/          # Utilities
│   │   └── context/      # React Context
│   └── package.json
├── server/                # Express Backend
│   ├── src/
│   │   ├── config/       # Database & email config
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Route handlers
│   │   └── utils/        # Helper functions
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License
