const {
  successCodes: {
    REQUEST_SUCCESS,
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
      res.status(REQUEST_SUCCESS).send({ data: movies });
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailer, thumbnail, movieid, nameRU, nameEN
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country, director, duration, year, description, image,
    trailer, thumbnail, movieid, nameRU, nameEN, owner
  })
    .then((movie) => res.status(RESOURCE_CREATED_SUCCESS).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные при создании фильма - ${err.message}`));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  // const { movieId } = req.params;
  console.log(`req params movieId - ${req.params.movieId}`);
  Movie.findOne({ movieid: req.params.movieId })
    .then((movie) => {
      console.log(`movie owner _id - ${movie.owner._id}`);
      if (!movie) {
        throw new NotFoundError('Фильм с указанным id, не найден');
      }
      if (String(movie.owner._id) !== String(req.user._id)) {
        throw new AuthorizationError('Вы не можете удалять чужие фильмы');
      }
      Movie.findOneAndRemove({ movieid: req.params.movieId })
        .then((movie) => {
          res.status(REQUEST_SUCCESS).send({ message: `Фильм ${movie.nameRU} удален` });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передано некорректное id фильма'));
        return;
      }
      next(err);
    });
};

// const addLike = (req, res, next) => {
//   const { cardId } = req.params;
//   Card.findByIdAndUpdate(cardId, {
//     $addToSet: { likes: req.user._id },
//   }, {
//     new: true,
//   })
//     .then((card) => {
//       if (!card) {
//         throw new NotFoundError('Карточка с указанным id не найдена');
//       }
//       res.status(REQUEST_SUCCESS).send({ data: card });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new BadRequestError('Переданы некорректные данные для постановки/снятия лайка'));
//         return;
//       }
//       next(err);
//     });
// };

// const deleteLike = (req, res, next) => {
//   const { cardId } = req.params;
//   Card.findByIdAndUpdate(cardId, {
//     $pull: { likes: req.user._id },
//   }, {
//     new: true,
//   })
//     .then((card) => {
//       if (!card) {
//         throw new NotFoundError('Карточка с указанным id не найдена');
//       }
//       res.status(REQUEST_SUCCESS).send({ data: card });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new BadRequestError('Переданы некорректные данные для постановки/снятия лайка'));
//         return;
//       }
//       next(err);
//     });
// };

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
  // addLike,
  // deleteLike,
};
