// authMiddleware.js

function checkAuthorization(req, res, next) {
    const authKey = req.headers.authorization;
  
    // Check if the authorization key is present and matches a valid key
    if (!authKey || authKey !== '9811') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // If the key is valid, proceed to the next middleware or route handler
    next();
  }
  
  module.exports = checkAuthorization;
  