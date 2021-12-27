require('dotenv').config();

const express = require('express');

const app = express();
// const path = require('path');

const { PORT = 3000 } = process.env;
const { NODE_ENV = 'development' } = process.env;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const rootRouter = require('./routes/index');
const errorHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/moviesexplorerdb');

// app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use('/', rootRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} port`);
  console.log(`Node environment now is - ${NODE_ENV}`);
});
