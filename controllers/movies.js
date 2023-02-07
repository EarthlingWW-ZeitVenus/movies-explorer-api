const {
  successCodes: {
    RESOURCE_CREATED_SUCCESS,
  },
} = require('../utils/constants');
const BadRequestError = require('../utils/BadRequestError');
const NotFoundError = require('../utils/NotFoundError');
const AuthorizationError = require('../utils/AuthorizationError');
const Movie = require('../models/movies');

const getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, imageUrl,
    trailer, thumbnail, id, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    imageUrl,
    trailer,
    thumbnail,
    id,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(RESOURCE_CREATED_SUCCESS).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Переданы некорректные данные при создании фильма - ${err.message}`));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { dbMovieId } = req.params;
  Movie.findById(dbMovieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным id, не найден');
      }
      if (String(movie.owner._id) !== String(req.user._id)) {
        throw new AuthorizationError('Вы не можете удалять чужие фильмы');
      }
      return Movie.findByIdAndRemove(dbMovieId)
        .then(() => {
          res.send({ message: `Фильм ${movie.nameRU} удален` });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передано некорректное id фильма'));
      }
      return next(err);
    });
};


module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
