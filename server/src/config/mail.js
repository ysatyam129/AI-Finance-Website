const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendLowBalanceAlert = async (userEmail, userName, remainingBalance, percentage, htmlContent) => {
  const mailOptions = {
    from: `"AI Finance" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `⚠️ Critical: Low Balance Alert - ${percentage}% Remaining`,
    html: htmlContent || `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
          <h1>⚠️ Low Balance Alert</h1>
          <p>AI Finance - Smart Financial Management</p>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2>Hi ${userName},</h2>
          <div style="background: #fee; border-left: 4px solid #f56565; padding: 15px; margin: 20px 0;">
            <p><strong>Your account balance is running low!</strong></p>
            <p>You have only <strong>${percentage}%</strong> of your salary remaining this month.</p>
            <p>Remaining Balance: <strong>₹${remainingBalance.toLocaleString()}</strong></p>
          </div>
          <p>Please review your expenses and plan accordingly.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/dashboard" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; padding: 12px 30px; text-decoration: none; 
                      border-radius: 25px; display: inline-block;">
              View Dashboard
            </a>
          </div>
          <p>Best regards,<br><strong>AI Finance Team</strong></p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Enhanced low balance alert sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Send welcome email to new users
const sendWelcomeEmail = async (userEmail, userName) => {
  const mailOptions = {
    from: `"AI Finance" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: '🎉 Welcome to AI Finance - Your Smart Financial Journey Begins!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
          <h1>🎉 Welcome to AI Finance!</h1>
          <p>Smart Financial Management Made Easy</p>
        </div>
        <div style="padding: 30px; background: #f9f9f9;">
          <h2>Hi ${userName},</h2>
          <p>Welcome to AI Finance! We're excited to help you take control of your financial future.</p>
          
          <h3>🚀 Get Started:</h3>
          <ul>
            <li>📊 View your personalized dashboard</li>
            <li>💰 Add your first expense</li>
            <li>📈 Track your spending patterns</li>
            <li>🔔 Set up budget alerts</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/dashboard" 
               style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; padding: 12px 30px; text-decoration: none; 
                      border-radius: 25px; display: inline-block;">
              Go to Dashboard
            </a>
          </div>
          
          <p>Happy budgeting!<br><strong>The AI Finance Team</strong></p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

module.exports = { sendLowBalanceAlert, sendWelcomeEmail };