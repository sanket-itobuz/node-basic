import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT,

  DB_URI: process.env.DB_URI,

  JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY,
  JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY,

  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
  JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY,

  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  HOST: process.env.HOST,
};

export default config;
