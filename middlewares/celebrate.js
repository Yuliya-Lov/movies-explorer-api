const { celebrate, Joi } = require('celebrate');

const tokenValidation = celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string(),
  }).unknown(true),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }).unknown(true),
});

const loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string(),
  }).unknown(true),
});

const newMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(/^https?:\/\/(www.)?[a-zA-Z0-9\-.~:/?#[\]@!$&'()*+,;=]{2,}\.[a-zA-Z]{2,}/).required(),
    trailerLink: Joi.string().pattern(/^https?:\/\/(www.)?[a-zA-Z0-9\-.~:/?#[\]@!$&'()*+,;=]{2,}\.[a-zA-Z]{2,}/).required(),
    nameRU: Joi.string().pattern(/^[А-Яа-я0-9\sё\-:]*$/).required(),
    nameEN: Joi.string().pattern(/^[A-Za-z0-9\s\-:]*$/).required(),
    thumbnail: Joi.string().pattern(/^https?:\/\/(www.)?[a-zA-Z0-9\-.~:/?#[\]@!$&'()*+,;=]{2,}\.[a-zA-Z]{2,}/).required(),
    _id: Joi.string().length(24).hex().required(),
  }).unknown(true),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  tokenValidation,
  createUserValidation,
  loginUserValidation,
  updateUserValidation,
  movieIdValidation,
  newMovieValidation,
};
