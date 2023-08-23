const router = require('express').Router();
const {
  HTTP_PAGE_STATUS_NOT_FOUND,
} = require('../utils/errors');
const {
  tokenValidation,
  createUserValidation,
  loginUserValidation,
} = require('../middlewares/celebrate');
const {
  createUser,
  login,
  logout,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { createLimiter } = require('../middlewares/ratelimiter');
const { userRouter } = require('./users');
const { movieRouter } = require('./movies');

router.post('/signup', createLimiter, createUserValidation, createUser);
router.post('/signin', loginUserValidation, login);
router.use(tokenValidation, auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.post('/signout', logout);
router.get('/*', (req, res, next) => {
  next(HTTP_PAGE_STATUS_NOT_FOUND);
});
module.exports = { router };
