import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserSchema from '../schema/UserSchema.js';
import config from '../config/envConfig.js';

const userSchema = new UserSchema();

export default class AuthValidations {
  validateSignUpRequest = async (req, res, next) => {
    try {
      if (req.headers.role === 'admin') {
        req.body.role = req.headers.role;
      } else {
        req.body.role = 'user';
      }

      req.body.password = await bcrypt.hash(req.body.password, 10);

      const validUser = await userSchema.authSignupUserSchema.validate(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      console.log(validUser);
      next();
    } catch (err) {
      next(err);
    }
  };

  validateLoginRequest = async (req, res, next) => {
    try {
      const validUser = await userSchema.authUserLoginSchema.validate(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      console.log(validUser);
      next();
    } catch (err) {
      next(err);
    }
  };

  validateResetPasswordRequest = async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);

      const validResetRequest = await userSchema.updatePasswordSchema.validate(
        req.body,
        {
          abortEarly: false,
          stripUnknown: true,
        }
      );

      console.log(validResetRequest);
      next();
    } catch (err) {
      next(err);
    }
  };

  validateRefreshRequest = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const refreshToken = authorization.split(' ')[1];

      const payload = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET_KEY);

      req.userId = payload.id;
      next();
    } catch (err) {
      next(err);
    }
  };

  validateUser = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const accessToken = authorization.split(' ')[1];

      const payload = jwt.verify(accessToken, config.JWT_ACCESS_SECRET_KEY);

      req.userId = payload.id;

      next();
    } catch (err) {
      res.status(401);
      next(err);
    }
  };
}
