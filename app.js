const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const { errors } = require('celebrate');

const { PORT } = process.env;
const app = express();
app.use(helmet());
const bodyParser = require('body-parser');
const {
  customErrors,
} = require('./utils/errors');
const { router } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { fullLimiter } = require('./middlewares/ratelimiter');

mongoose.connect('mongodb://0.0.0.0:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000', 'https://mymovies.nomoredomainsicu.ru'], credentials: true }));
app.use(requestLogger);

app.use('/', fullLimiter, router);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => customErrors(err, req, res, next));

app.listen(PORT, () => {
  console.log(`App Yul listening on port ${PORT}`);
});
