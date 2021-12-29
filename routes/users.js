const router = require('express').Router();
const {
  updateUser,
  currentUser,
  logout,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUdateUser } = require('../middlewares/validations');

router.use(auth);

router.delete('/signout', logout);
router.get('/me', currentUser);
router.patch('/me', validateUdateUser, updateUser);

module.exports = router;
