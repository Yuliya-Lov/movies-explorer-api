const userRouter = require('express').Router();
const {
  updateUserValidation,
} = require('../middlewares/celebrate');
const {
  updateUserInfo,
  authMe,
} = require('../controllers/users');
const {
  HTTP_PAGE_STATUS_NOT_FOUND,
} = require('../utils/errors');

userRouter.get('/me', authMe);
userRouter.patch('/me', updateUserValidation, updateUserInfo);
userRouter.get('/*', (req, res, next) => {
  next(HTTP_PAGE_STATUS_NOT_FOUND);
});

module.exports = {
  userRouter,
};
