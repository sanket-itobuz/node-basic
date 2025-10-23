import express from 'express';
import AuthValidations from '../validate/AuthValidations.js';
import sendOtp from '../controller/otpController.js';
import AuthController from '../controller/AuthController.js';

const route = express.Router();

const userAuthOperations = new AuthController();
const userAuthValidations = new AuthValidations();

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
