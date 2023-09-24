const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const {
  HTTP_STATUS_UNAUTHORIZED,
} = require('../utils/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Пользователь',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Некорректный e-mail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email })
    .orFail(HTTP_STATUS_UNAUTHORIZED)
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(HTTP_STATUS_UNAUTHORIZED);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(HTTP_STATUS_UNAUTHORIZED);
          }
          return user;
        })
        .catch((err) => Promise.reject(err));
    })
    .catch((err) => Promise.reject(err));
};

module.exports = mongoose.model('user', userSchema);
