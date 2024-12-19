import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.auth_token; // Extract token from cookies
  
    if (!token) {
      return res.status(401).redirect('/login'); // Redirect to login if token is missing
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).send('Invalid or expired token.');
      }
  
      req.user = user; // Attach user data to the request object
      next();
    });
  };
  
export default authenticateToken;
