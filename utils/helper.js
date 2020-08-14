const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

module.exports = {
  isEmpty: string => string.trim() === '',
  isValidEmail: email => {
    const regEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    return regEx.test(email);
  },
  isValidPhone: phone => {
    const regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    return regEx.test(phone);
  },
  generateToken: data => {
    const jwtSecret = process.env.jwtSecret;
    return jwt.sign(data, jwtSecret, { expiresIn: '1h' });
  },
  checkAuth: (req, require = true) => {
    const jwtSecret = process.env.jwtSecret;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      if (require) {
        throw new Error('Authorization header must be provided.');
      } else {
        return null;
      }
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      throw new Error("Authentication token must be 'Bearer [token]'.");
    }

    try {
      const user = jwt.verify(token, jwtSecret);

      return user;
    } catch (err) {
      throw new AuthenticationError('Invalid/Expired token.');
    }
  },
};
