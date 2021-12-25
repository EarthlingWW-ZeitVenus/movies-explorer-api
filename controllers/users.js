const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  successCodes: {
    REQUEST_SUCCESS,
    RESOURCE_CREATED_SUCCESS,
  },
} = require('../utils/constants');
const BadRequestError = require('../utils/BadRequestError');
// const NotFoundError = require('../utils/NotFoundError');
const ConflictsError = require('../utils/ConflictsError');
const User = require('../models/users');

// const getUsers = (req, res, next) => {
//   User.find({})
//     .then((users) => {
//       res.status(REQUEST_SUCCESS).send({ data: users });
//     })
//     .catch(next);
// };

// const getUser = (req, res, next) => {
//   const { userId } = req.params;
//   User.findById(userId)
//     .then((user) => {
//       if (!user) {
//         throw new NotFoundError('Пользователь с указанным id, не найден');
//       }
//       res.status(REQUEST_SUCCESS).send({ data: user });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new BadRequestError('Передано некорректное id пользователя'));
//         return;
//       }
//       next(err);
//     });
// };

const currentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(REQUEST_SUCCESS).send({ data: user });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      const {
        name, email,
      } = user;
      res
        .cookie('jwt', token, { httpOnly: true, sameSite: 'none' })
        .status(REQUEST_SUCCESS)
        .send({
          data: {
            name, email,
          },
        });
    })
    .catch(next);
};

const logout = (req, res) => {
  return res
    .clearCookie('jwt')
    .status(REQUEST_SUCCESS)
    .send({ message: 'Вы успешно вышли!' });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      password: hash,
      email: req.body.email,
      name: req.body.name,
    // ...req.body
    }))
    .then((user) => {
      const {
        name, email,
      } = user;
      res
        .status(RESOURCE_CREATED_SUCCESS)
        .send({
          data: {
            name, email,
          },
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictsError('Пользователь с данной почтой уже зарегистрирован'));
        return;
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true, // для того, чтобы then получил обновленную запись
    runValidators: true, // данные валидируются перед изменением
    // upsert: true //создает новую запись в базе, если не находит среди существующих
  })
    .then((user) => {
      res.status(REQUEST_SUCCESS).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передано некорректное id пользователя'));
        return;
      } if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении данных пользователя'));
        return;
      }
      next(err);
    });
};

// const updateAvatar = (req, res, next) => {
//   User.findByIdAndUpdate(req.user._id, req.body, {
//     new: true,
//     runValidators: true,
//   })
//     .then((user) => {
//       res.status(REQUEST_SUCCESS).send({ data: user });
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new BadRequestError('Передано некорректное id пользователя'));
//         return;
//       } if (err.name === 'ValidationError') {
//         next(new BadRequestError('Переданы некорректные данные при обновлении данных пользователя'));
//         return;
//       }
//       next(err);
//     });
// };

module.exports = {
  // getUsers,
  // getUser,
  createUser,
  updateUser,
  // updateAvatar,
  login,
  currentUser,
  logout,
};
