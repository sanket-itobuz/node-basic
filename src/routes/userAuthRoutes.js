import express from 'express';
import UserOperations from '../controller/userController.js';
import UserValidations from '../validate/userValidator.js';
import sendOTP from '../controller/otpController.js';

const route = express.Router();

const userAuthOperations = new UserOperations();
const userAuthValidations = new UserValidations();

route.post(
  '/auth/signup',
  userAuthValidations.validateSignUpRequest,
  userAuthOperations.saveUser
);

route.post(
  '/auth/login',
  userAuthValidations.validateLoginRequest,
  userAuthOperations.loginUser
);

route.post('/auth/otp', sendOTP);

route.post(
  '/auth/reset',
  userAuthValidations.validateResetPasswordRequest,
  userAuthOperations.resetPassword
);

route.post(
  '/auth/refresh',
  userAuthValidations.validateRefreshRequest,
  userAuthOperations.refreshToken
);

route.post(
  '/auth',
  userAuthValidations.validateUser,
  userAuthOperations.getUser
);

export default route;
