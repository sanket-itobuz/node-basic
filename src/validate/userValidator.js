import { authUserSchema } from '../schema/userSchema.js';

export default class UserValidations {
  validateSignUpRequest = async (req, res, next) => {
    try {
      if (req.headers.role === 'admin') {
        req.body.role = req.headers.role;
      } else {
        req.body.role = 'user';
      }
      const validUser = await authUserSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      console.log(validUser);
      next();
    } catch (err) {
      next(err);
    }
  };
}
