import jwt from 'jsonwebtoken';
import config from '../config/envConfig.js';

export default class TokenGenerator {
  accessTokenGenerator = (id) => {
    try {
      const secretKey = config.JWT_ACCESS_SECRET_KEY;
      const expiry = config.JWT_ACCESS_TOKEN_EXPIRY;

      const accessToken = jwt.sign({ id }, secretKey, {
        expiresIn: expiry,
      });

      return accessToken;
    } catch (err) {
      console.log(err);
    }
  };

  refreshTokenGenerator = (id) => {
    try {
      const secretKey = config.JWT_REFRESH_SECRET_KEY;
      const expiry = config.JWT_REFRESH_TOKEN_EXPIRY;

      const refreshToken = jwt.sign({ id }, secretKey, {
        expiresIn: expiry,
      });

      return refreshToken;
    } catch (err) {
      console.log(err);
    }
  };
}
