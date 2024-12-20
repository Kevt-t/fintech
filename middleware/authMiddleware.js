import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).redirect('/login'); // Redirect if no token
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(403).send('Invalid or expired token. Please log in again.');
    }

    req.user = user; // Attach user data to request object
    next();
  });
};

export default authenticateToken;
