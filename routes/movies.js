const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');
const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../middlewares/validations');

router.use(auth);

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
