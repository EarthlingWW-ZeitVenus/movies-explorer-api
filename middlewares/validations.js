const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
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
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    imageUrl: Joi.string().required(),
    trailer: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Невалидный url');
      }),
    thumbnail: Joi.string().pattern(regExpUrl).required(),
//    thumbnail: Joi.string().required(),
    id: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    dbMovieId: Joi.string().hex().length(24).required(),
  }),
});

//const validateDeleteMovie = celebrate({
//  params: Joi.object().keys({
//    movieId: Joi.number().integer().required(),
//  }),
//});


module.exports = {
  validateSignup,
  validateSignin,
  validateUdateUser,
  validateCreateMovie,
  validateDeleteMovie,
};
