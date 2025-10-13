import {
  authSignupUserSchema,
  authUserLoginSchema,
  updateUserSchema,
} from '../schema/userSchema.js';

export default class UserValidations {
  validateSignUpRequest = async (req, res, next) => {
    try {
      if (req.headers.role === 'admin') {
        req.body.role = req.headers.role;
      } else {
        req.body.role = 'user';
      }

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
      const validResetRequest = await updateUserSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      console.log(validResetRequest);
      next();
    } catch (err) {
      next(err);
    }
  };
}
