import express from 'express';
import UserOperations from '../controller/userController.js';
import UserValidations from '../validate/userValidator.js';

const route = express.Router();

const userAuthOperations = new UserOperations();
const userAuthValidations = new UserValidations();

route.post(
  '/auth/signup',
  userAuthValidations.validateSignUpRequest,
  userAuthOperations.saveUser
);
// route.post('/auth/login');
// route.post('/auth/otp');
// route.post('/auth/resetpassword');

export default route;
