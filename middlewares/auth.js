const jwt = require('jsonwebtoken');
const AuthorizationError = require('../utils/AuthorizationError');
const AuthenticationError = require('../utils/AuthenticationError');

//Не забыть создать условие для использования двух разных ключей для продакшн и девелоп-режимов
const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new AuthenticationError('Необходима аутентификация'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;
