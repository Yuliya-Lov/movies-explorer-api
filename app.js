const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const { PORT } = process.env;
const app = express();
const bodyParser = require('body-parser');
const {
  HTTP_PAGE_STATUS_NOT_FOUND,
  customErrors,
} = require('./utils/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://0.0.0.0:27017/bitfilmsdb', {
  useNewUrlParser: true,
});





app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => customErrors(err, req, res, next));

app.listen(PORT, () => {
  console.log(`App Yul listening on port ${PORT}`);
});
