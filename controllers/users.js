const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  createToken,
} = require('../utils/token');

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create(
        {
          email: req.body.email,
          password: hash,
          name: req.body.name,
        },
      )
        .then((user) => res
          .status(201)
          .send({
            email: user.email,
            name: user.name,
          }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

const authMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = createToken({ _id: user._id });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        }).send({ message: 'Авторизация прошла успешно!' });
    })
    .catch((err) => next(err));
};

const logout = (req, res) => {
  res.clearCookie('jwt').status(200).send({ message: 'Успешный выход из учетной записи' });
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  }).orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

module.exports = {
  createUser,
  updateUserInfo,
  authMe,
  login,
  logout,
};
