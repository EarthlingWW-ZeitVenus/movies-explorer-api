const mongoose = require('mongoose');
const { regExpUrl } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    // minlength: 2,
    // maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    // minlength: 2,
    // maxlength: 30,
  },
  duration: {
    type: Number,
    required: true,
    // minlength: 2,
    // maxlength: 30,
  },
  year: {
    type: Number,
    required: true,
    // minlength: 2,
    // maxlength: 30,
  },
  description: {
    type: String,
    required: true,
    // minlength: 2,
    // maxlength: 30,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return regExpUrl.test(value);
      },
      message: (props) => `${props.value} - ссылка задана неверно`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return regExpUrl.test(value);
      },
      message: (props) => `${props.value} - ссылка задана неверно`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return regExpUrl.test(value);
      },
      message: (props) => `${props.value} - ссылка задана неверно`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieid: {
    type: Number,
    // ref: 'movie',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
