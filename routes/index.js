const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const defaultRouter = require('../controllers/default');
const {
  createUser,
  login,
} = require('../controllers/users');


router.post('/signup',
celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().required().min(2).max(30),
  }),
}),
createUser);

router.post('/signin',
celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}),
login);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', defaultRouter);


module.exports = router;
