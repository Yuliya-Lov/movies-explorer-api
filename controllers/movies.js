const Movie = require('../models/movie');
const {
  HTTP_STATUS_FORBIDDEN,
  HTTP_MOVIE_STATUS_NOT_FOUND,
} = require('../utils/errors');

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    id,
  } = req.body;
  Movie.create(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId: id,
      owner: req.user._id,
    },
  )
    .then((movie) => res
      .status(201)
      .send({ data: movie }))
    .catch((err) => next(err));
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(HTTP_MOVIE_STATUS_NOT_FOUND)
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return next(HTTP_STATUS_FORBIDDEN);
      }
      return Movie.deleteOne({ _id: req.params._id })
        .then(() => res.status(200).send({
          message: 'Фильм удален из сохраненного',
        }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

module.exports = {
  getUserMovies,
  createMovie,
  deleteMovie,
};
