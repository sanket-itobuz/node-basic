import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class TokenGenerator {
  accessTokenGenerator = (id) => {
    const secretKey = process.env.JWT_ACCESS_SECRET_KEY;
    const expiry = process.env.JWT_ACCESS_TOKEN_EXPIRY;

    const accessToken = jwt.sign({ id }, secretKey, {
      expiresIn: expiry,
    });
    return accessToken;
  };

  refreshTokenGenerator = (id) => {
    const secretKey = process.env.JWT_REFRESH_SECRET_KEY;
    const expiry = process.env.JWT_REFRESH_TOKEN_EXPIRY;

    const refreshToken = jwt.sign({ id }, secretKey, {
      expiresIn: expiry,
    });
    return refreshToken;
  };
}
