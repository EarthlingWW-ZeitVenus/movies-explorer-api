const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rootRouter = require('./routes/index');
const errorHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGODB_URL, PORT, NODE_ENV } = require('./utils/constants');
const limiter = require('./middlewares/rate-limiter');

mongoose.connect(MONGODB_URL);

const app = express();
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use('/', rootRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} port`);
  console.log(`Node environment now is - ${NODE_ENV}`);
});
