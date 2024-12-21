const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Extract token from header
  if (!token) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id; 

    console.log("token verified")
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = verifyToken;