const movieRouter = require('express').Router();
const {
  getUserMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  HTTP_PAGE_STATUS_NOT_FOUND,
} = require('../utils/errors');

const {
  newMovieValidation,
  movieIdValidation,
} = require('../middlewares/celebrate');

movieRouter.get('/', getUserMovies);
movieRouter.post('/', newMovieValidation, createMovie);
movieRouter.delete('/:_id', movieIdValidation, deleteMovie);
movieRouter.get('/*', (req, res, next) => {
  next(HTTP_PAGE_STATUS_NOT_FOUND);
});

module.exports = {
  movieRouter,
};
