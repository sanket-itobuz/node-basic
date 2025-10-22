import express from 'express';
import UserValidations from '../validate/UserValidations.js';
import sendOtp from '../controller/otpController.js';
import UserController from '../controller/UserController.js';

const route = express.Router();

const userAuthOperations = new UserController();
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

route.post('/auth/otp', sendOtp);

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
  '/auth/fetch',
  userAuthValidations.validateUser,
  userAuthOperations.getUser
);

export default route;
