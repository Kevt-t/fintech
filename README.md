# FinTech Transaction Tracker

A modern web application to help users manage their finances effectively. The FinTech Transaction Tracker allows users to view their balance, record transactions (deposits, withdrawals, and expenses), and use an investment calculator for financial planning.

### Features
- **User Authentication**:  Users can sign up, log in, and manage their accounts securely.
- **Transaction Management**: Users can make deposits and withdrawals to/from their balance.
- **Investment Calculator**: Users can calculate the future value of their investments based on the principal amount, interest rate, and time period.
- **Responsive Design**: A user-friendly interface built with Bootstrap ensures compatibility across devices.
- **Secure Architecture:**: Backend security includes hashed passwords, token-based authentication, and sanitized inputs.

### Tech Stack

- **Backend**
  - JavaScript (Node.js)
  - Express.js
  - Sequelize (for mySQL database interaction)
  - mySQL (database)
  - JWT (for authentication)
  - bcrypt (for password hashing)
  - cookie-parser (for parsing cookies in requests)
- **Frontend**
  - HTML
  - CSS
  - JavaScript (using Fetch API to interact with the backend)
  - EJS (Embedded JavaScript)
  - CSS (Bootstrap for styling)
- **Dev Tools**
  - Nodemon (Auto-restart the server during development.)
  - dotenv (for managing environment variables)

# Get Started

### Prerequisites
- **Node.js**: Make sure you have Node.js installed on your local machine.
- **MySQL**: You will need to have MySQL set up on your local machine. Alternatively, you can use a remote MySQL database.

### Installing
1. **Clone the repository**: 
- `git clone https://github.com/kevt-t/fintech.git`


2. **Install dependencies**:
- `npm install bcrypt bootstrap cookie-parser dotenv ejs express jsonwebtoken mysql2 sequelize`

3. **Set up the database**: 
- Create a new MySQL database.
- In the `.env` file, configure the database connection (don't leave out SECRET_KEY for JWT):

```plaintext
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST= 
PORT= 
SECRET_KEY=
```

4. **Run the backend server**:
`npm start`


# Project Structure

```
fintechV2/
│
├── fintech/
│   ├── config/
│   │   └── db.js                    # Database connection setup
│   │
│   ├── models/
│   │   ├── Transaction.js            # Transaction model
│   │   └── User.js                   # User model
|   |   └── associations.js           # Associations between models
│   │
│   ├── routes/
│   │   ├── authRoutes.js             # Authentication routes (signup, login)
│   │   └── transactionRoutes.js      # Transaction routes (deposit, withdraw)
│   │   
│   ├── middleware/
│   │   └── authMiddleware.js          # Middleware for token authentication
│   │
│   ├── public/
│   │   ├── styles/
│   │   │   ├── dashboard.css          # CSS for transaction update functionality
│   │   │   └── bootstrap.min.css      # Bootstrap CSS
│   │   └── script/
│   │       └── dashboard.js           # Not used right now, meant to be external script
│   │
│   ├── views/
│   │   ├── index.ejs                  # Main page view
│   │   ├── signup.ejs                 # Signup page view
│   │   ├── login.ejs                  # Login page view
│   │   └── dashboard.ejs              # Dashboard page view
│   │
│   ├── index.js                       # Main entry point of the backend
│   ├── package.json                   # Project metadata and dependencies
│   └── .env                           # Environment variables
```
# Notes

### 1. Database Setup
- Make sure you create a MySQL database (e.g., fintech_db) before running the backend. You can update the .env file with the appropriate database credentials.

### 2. JWT Authentication
- When logging in, a JWT (JSON Web Token) is returned. The logout button clears the JWT.




