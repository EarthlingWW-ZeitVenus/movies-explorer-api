const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUser,
  currentUser,
  logout,
} = require('../controllers/users');
const auth = require('../middlewares/auth');


router.use(auth);
router.delete('/signout', logout);
router.get('/me', currentUser);

router.patch('/me',
celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
}),
updateUser);


module.exports = router;
