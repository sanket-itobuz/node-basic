import * as yup from 'yup';

// Validating the data coming from Client Side to process further

export default class UserSchema {
  authSignupUserSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    otp: yup.string(),
    role: yup.string(),
    isVerified: yup.string(),
  });

  authUserLoginSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  updatePasswordSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
    otp: yup.string().required(),
  });
}
