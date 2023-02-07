require('dotenv').config();

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
  secure: true,
  maxAge: 1000 * 60 * 60 * 24 * 7, // куки будет удален через неделю
};

const {
  NODE_ENV = 'development',
  JWT_SECRET = 'some-secret-key',
  PORT = 3000,
  MONGODB_URL = 'mongodb://localhost:27017/moviesdb',
} = process.env;

module.exports = {
  errorCodes,
  successCodes,
  regExpUrl,
  MONGODB_URL,
  COOKIE_OPTIONS,
  JWT_SECRET,
  PORT,
  NODE_ENV,
};
