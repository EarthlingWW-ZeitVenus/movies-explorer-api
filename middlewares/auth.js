const jwt = require('jsonwebtoken');
const AuthorizationError = require('../utils/AuthorizationError');
const AuthenticationError = require('../utils/AuthenticationError');
const { NODE_ENV, JWT_SECRET } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(NODE_ENV);
  console.log(JWT_SECRET);
  // res.send({ message: `NODE_ENV: - ${NODE_ENV}, JWT_SECRET: - ${JWT_SECRET}` });
  if (!token) {
    next(new AuthenticationError('Необходима аутентификация'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;
