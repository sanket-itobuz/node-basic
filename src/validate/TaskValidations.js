import TaskSchema from '../schema/TaskSchema.js';
import jwt from 'jsonwebtoken';
import config from '../config/envConfig.js';

const taskSchema = new TaskSchema();

export default class TaskValidations {
  validateFetchRequest = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const access_token = authorization.split(' ')[1];

      const payload = jwt.verify(access_token, config.JWT_ACCESS_SECRET_KEY);

      req.userId = payload.id;

      next();
    } catch (err) {
      res.status(401);
      next(err);
    }
  };

  validateInsertRequest = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const access_token = authorization.split(' ')[1];

      const payload = jwt.verify(access_token, config.JWT_ACCESS_SECRET_KEY);

      req.body.userId = payload.id;

      const validTodo = await taskSchema.insertTaskSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      console.log(validTodo);
      next();
    } catch (err) {
      res.status(401);
      next(err);
    }
  };

  validateUpdateRequest = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const access_token = authorization.split(' ')[1];

      const payload = jwt.verify(access_token, config.JWT_ACCESS_SECRET_KEY);

      req.body.userId = payload.id;

      const validTodo = await taskSchema.updateTaskSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      console.log(validTodo);
      next();
    } catch (err) {
      res.status(401);
      next(err);
    }
  };

  validateDeleteRequest = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const access_token = authorization.split(' ')[1];

      const payload = jwt.verify(access_token, config.JWT_ACCESS_SECRET_KEY);

      req.userId = payload.id;
      next();
    } catch (err) {
      res.status(401);
      next(err);
    }
  };

  validateDeleteAllRequest = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const access_token = authorization.split(' ')[1];

      const payload = jwt.verify(access_token, config.JWT_ACCESS_SECRET_KEY);

      req.userId = payload.id;
      next();
    } catch (err) {
      res.status(401);
      next(err);
    }
  };

  validateSearchRequest = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const access_token = authorization.split(' ')[1];

      const payload = jwt.verify(
        access_token,
        process.env.JWT_ACCESS_SECRET_KEY
      );

      req.userId = payload.id;

      const validTodo = await taskSchema.searchTaskSchema.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      console.log(validTodo);
      next();
    } catch (err) {
      res.status(401);
      next(err);
    }
  };
}
