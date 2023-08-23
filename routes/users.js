const userRouter = require('express').Router();
const {
  updateUserValidation,
} = require('../middlewares/celebrate');
const {
  updateUserInfo,
  authMe,
} = require('../controllers/users');

userRouter.get('/me', authMe);
userRouter.patch('/me', updateUserValidation, updateUserInfo);

module.exports = {
  userRouter,
};
