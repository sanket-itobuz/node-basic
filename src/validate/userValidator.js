import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  authSignupUserSchema,
  authUserLoginSchema,
  updatePasswordSchema,
} from '../schema/userSchema.js';

dotenv.config();

export default class UserValidations {
  validateSignUpRequest = async (req, res, next) => {
    try {
      if (req.headers.role === 'admin') {
        req.body.role = req.headers.role;
      } else {
        req.body.role = 'user';
      }

      req.body.password = await bcrypt.hash(req.body.password, 10);

      const validUser = await authSignupUserSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      console.log(validUser);
      next();
    } catch (err) {
      next(err);
    }
  };

  validateLoginRequest = async (req, res, next) => {
    try {
      const validUser = await authUserLoginSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      console.log(validUser);
      next();
    } catch (err) {
      next(err);
    }
  };

  validateResetPasswordRequest = async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const validResetRequest = await updatePasswordSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      console.log(validResetRequest);
      next();
    } catch (err) {
      next(err);
    }
  };

  validateRefreshRequest = async (req, res, next) => {
    try {
      const refreshToken = req.headers.authorization;

      const payload = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET_KEY
      );

      req.userId = payload.id;
      next();
    } catch (err) {
      next(err);
    }
  };
}
