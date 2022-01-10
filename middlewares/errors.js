const erorrHandler = (err, req, res, next) => {
  const { statusCode = 500, message, name } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? `На сервере произошла ошибка - ${message}; имя ошибки - ${name}`
        : message,
    });
  next();
};

module.exports = erorrHandler;
