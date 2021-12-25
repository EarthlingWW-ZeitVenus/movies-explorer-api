const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');
const { regExpUrl } = require('../utils/constants');

router.use(auth);
router.get('/', getMovies);

router.post('/',
celebrate({
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
}),
createMovie);

router.delete('/:movieId',
celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex(),
  }),
}),
deleteMovie);


module.exports = router;
