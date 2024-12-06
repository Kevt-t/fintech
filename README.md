# FinTech Transaction Tracking App

A simple web application for tracking financial transactions like deposits and withdrawals. Users can create an account, log in, and manage their balance through deposits and withdrawals.

### Features
- **User Authentication**: Users can sign up, log in, and manage their accounts.
- **Transaction Management**: Users can make deposits and withdrawals to/from their balance.
- **Secure Authentication**: Passwords are securely hashed using bcrypt, and JWT tokens are used for authentication.

### Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - Sequelize (for mySQL database interaction)
  - mySQL (database)
  - JWT (for authentication)
  - bcrypt (for password hashing)
- **Frontend**
  - HTML, CSS, and JavaScript
  - Fetch API for making HTTP requests to the backend

- **Dev Tools**
  - Nodemon (for hot reloading the server during development)

# Get Started

### Prerequisites
- **Node.js**: Make sure you have Node.js installed on your local machine.
- **MySQL**: You will need to have MySQL set up on your local machine. Alternatively, you can use a remote MySQL database.

### Installing
1. **Clone the repository**: 
- git clone https://github.com/your-username/fintech.git
- cd fintech

2. **Install dependencies**:
- `npm install mysql2 sequelize nodemon dotenv bcrypt jsonwebtoken`

3. **Set up the database**: 
- Create a new MySQL database.
- In the `.env` file, configure the database connection:

3. **Set up the database**: 
- Create a new MySQL database.
- In the `.env` file, configure the database connection:

```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=fintech_db
```

4. **Run the backend server**:
`npm run dev`

# Frontend setup

1. **Navigate to the front end directory**: 'cd fintech-frontend'

2. **Open `index.html` in your browser**:
- You can either open the file directly in your browser or run a local server (for example, using the Live Server extension in Visual Studio Code).

3. **Connect the frontend to the backend**:
- Ensure that your frontend is making requests to 'http://localhost:3000/signup' and other relevant backend endpoints.

### Usage
- Enter a username, email, and password, then click "Sign Up".
- Upon successful sign-up, you will be redirected to the login page.

The rest is WIP

# Project Structure

```
fintech/
│
├── config/
│   └── db.js                    # Database connection setup
│
├── models/
│   ├── Transaction.js            # Transaction model
│   └── User.js                   # User model
│
├── routes/
│   ├── authRoutes.js             # Authentication routes (signup, login)
│   └── transactionRoutes.js      # Transaction routes (deposit, withdraw)
│
├── .env                          # Environment variables
├── index.js                      # Main entry point of the backend
├── package.json                  # Project metadata and dependencies
└── package-lock.json             # Locked dependencies version
```







