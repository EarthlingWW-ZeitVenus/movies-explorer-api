require('dotenv').config();

const {
  NODE_ENV = 'development',
  JWT_SECRET,
  PORT = 3000,
  MONGODB_URL = 'mongodb://localhost:27017/moviesexplorerdb',
} = process.env;

const errorCodes = {
  BAD_REQUEST_ERROR: 400,
  AUTHENTICATION_ERROR: 401,
  AUTHORIZATION_ERROR: 403,
  RESOURCE_NOT_FOUND_ERROR: 404,
  CONFLICTS_ERROR: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const successCodes = {
  REQUEST_SUCCESS: 200,
  RESOURCE_CREATED_SUCCESS: 201,
};

const regExpUrl = /ht{2}ps?:\/\/(w{3}\.)?[\w-]+\.[\w-]+([./][^./][\w\-.~:/?#[\]@!$&'()*+,;=]*)?#?/;

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'none',
  maxAge: 1000 * 60 * 60 * 24 * 7, // куки будет удален через неделю
};

const JWT_SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';

module.exports = {
  errorCodes,
  successCodes,
  regExpUrl,
  MONGODB_URL,
  COOKIE_OPTIONS,
  JWT_SECRET_KEY,
  PORT,
  NODE_ENV,
};
