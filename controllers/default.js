const NotFoundError = require('../utils/NotFoundError');

const defaultRouter = (req, res, next) => {
  return next(new NotFoundError('Ресурс не найден'));
};

module.exports = defaultRouter;
