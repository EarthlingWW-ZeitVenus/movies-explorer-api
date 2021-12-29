const { celebrate, Joi } = require('celebrate');
const { regExpUrl } = require('../utils/constants');

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

const validateUdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regExpUrl),
    trailer: Joi.string().required().pattern(regExpUrl),
    thumbnail: Joi.string().required().pattern(regExpUrl),
    owner: Joi.string().length(24).hex().required(),
    movieid: Joi.string().hex().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex(),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateUdateUser,
  validateCreateMovie,
  validateDeleteMovie,
};
