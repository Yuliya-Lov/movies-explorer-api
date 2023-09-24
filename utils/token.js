const jwt = require('jsonwebtoken');
const {
  jwtSecret,
} = require('../config');

const createToken = (payload) => jwt.sign(payload, jwtSecret);

const checkToken = (token) => {
  if (!token) {
    return false;
  }
  try {
    return jwt.verify(token, jwtSecret);
  } catch (e) {
    return false;
  }
};

module.exports = {
  createToken,
  checkToken,
};
