import * as yup from 'yup';

// Validating the data coming from Client Side to process further

export const authSignupUserSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  otp: yup.string(),
  role: yup.string(),
  isVerified: yup.string(),
});

export const authUserLoginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const updateUserSchema = yup.object({
  password: yup.string().required(),
});
