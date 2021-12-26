const mongoose = require('mongoose');
const externalValidator = require('validator');
const bcrypt = require('bcryptjs');
const AuthenticationError = require('../utils/AuthenticationError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return externalValidator.isEmail(value);
      },
      message: 'Передан некорректный адрес почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthenticationError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthenticationError('Неправильные почта или пароль - bcrypt'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
