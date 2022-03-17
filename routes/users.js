const router = require('express').Router();
const {
  updateUser,
  currentUser,
  logout,
} = require('../controllers/users');
const { validateUdateUser } = require('../middlewares/validations');

router.delete('/signout', logout);
router.get('/me', currentUser);
router.patch('/me', validateUdateUser, updateUser);

module.exports = router;
