const movieRouter = require('express').Router();
const {
  getUserMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  newMovieValidation,
  movieIdValidation,
} = require('../middlewares/celebrate');

movieRouter.get('/', getUserMovies);
movieRouter.post('/', newMovieValidation, createMovie);
movieRouter.delete('/:_id', movieIdValidation, deleteMovie);

module.exports = {
  movieRouter,
};
