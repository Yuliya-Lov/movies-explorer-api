const {
  NODE_ENV,
  JWT_SECRET,
  DB_URL,
  PORT,
} = process.env;

const port = NODE_ENV === 'production' ? PORT : 3000;
const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
const dbUrl = NODE_ENV === 'production' ? DB_URL : 'mongodb://0.0.0.0:27017/bitfilmsdb';

module.exports = {
  port,
  jwtSecret,
  dbUrl,
};
