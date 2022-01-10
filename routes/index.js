const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const defaultRouter = require('../controllers/default');
const {
  createUser,
  login,
} = require('../controllers/users');
const {
  validateSignin,
  validateSignup,
} = require('../middlewares/validations');
const auth = require('../middlewares/auth');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', defaultRouter);

module.exports = router;
