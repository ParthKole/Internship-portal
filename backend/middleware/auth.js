const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    // FIX: Use process.env.JWT_SECRET or a fallback 'secret_key' (must match auth.js)
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    req.user = verified;
    next();
  } catch (err) {
    // If token is invalid/expired, return 401 so frontend knows to logout
    res.status(401).json({ message: 'Invalid Token' });
  }
};