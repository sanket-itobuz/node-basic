import jwt from 'jsonwebtoken';
import config from '../config/envConfig.js';

export default function verifyToken(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    const access_token = authorization.split(' ')[1];

    const payload = jwt.verify(access_token, config.JWT_ACCESS_SECRET_KEY);

    req.userId = payload.id;

    if (req.body) {
      req.body.userId = payload.id;
    }

    next();
  } catch (error) {
    res.status(401);
    next(error);
  }
}
