# FinTech Transaction Tracking App

A simple web application for tracking financial transactions like deposits and withdrawals. Users can create an account, log in, and manage their balance through deposits and withdrawals.

### Features
- **User Authentication**: Users can sign up, log in, and manage their accounts.
- **Transaction Management**: Users can make deposits and withdrawals to/from their balance.
- **Secure Authentication**: Passwords are securely hashed using bcrypt, and JWT tokens are used for authentication.

### Tech Stack

- **Backend**
  - JavaScript (Node.js)
  - Express.js
  - Sequelize (for mySQL database interaction)
  - mySQL (database)
  - JWT (for authentication)
  - bcrypt (for password hashing)
- **Frontend**
  - HTML
  - CSS
  - JavaScript (using Fetch API to interact with the backend)
- **Dev Tools**
  - Nodemon (for hot reloading the server during development)
  - dotenv (for managing environment variables)
  - CORS (for enabling cross-origin resource sharing)

# Get Started

### Prerequisites
- **Node.js**: Make sure you have Node.js installed on your local machine.
- **MySQL**: You will need to have MySQL set up on your local machine. Alternatively, you can use a remote MySQL database.

### Installing
1. **Clone the repository**: 
- `git clone https://github.com/your-username/fintech.git`
- `cd fintech`

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
`npx nodemon index.js
`

# Frontend setup

1. **Navigate to the front end directory**:
- `cd fintech-frontend`

2. **Open `index.html` in your browser**:
- You can either open the file directly in your browser or run a local server (for example, using the Live Server extension in Visual Studio Code).

3. **Connect the frontend to the backend**:
- Ensure that your frontend is making requests to http://localhost:3000/signup and other relevant backend endpoints.

### Run the backend server
- `npx nodemon index.js`


### Usage
- Enter a username, email, and password, then click "Sign Up".
- Check mySQL to confirm data upload

The rest is WIP

# Project Structure

```
fintech/
│
├── config/
│   └── db.js                    # Database connection setup
### Cors (Cross Origin Resource Sharing)
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
# Notes

### 1. Cors (Cross Origin Resource Sharing)
- Since the frontend and backend are running on different ports during development (e.g., frontend on localhost:5500 and backend on localhost:3000), CORS is required to allow the frontend to make API requests to the backend.

- CORS is enabled in the backend by using the cors package. If you want to remove or modify the CORS settings, you can uninstall the cors package and adjust the index.js file accordingly. 

### 2. Database Setup
- Make sure you create a MySQL database (e.g., fintech_db) before running the backend. You can update the .env file with the appropriate database credentials.

### 3. JWT Authentication
- When logging in, a JWT (JSON Web Token) is returned. You can use this token to access protected routes or implement additional features like token expiration and refresh tokens.






