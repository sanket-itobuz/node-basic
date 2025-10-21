import {
  insertTaskSchema,
  searchTaskSchema,
  updateTaskSchema,
} from '../schema/taskSchema.js';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class ToDoValidations {
  validateFetchRequest = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const access_token = authorization.split(' ')[1];

      const payload = jwt.verify(
        access_token,
        process.env.JWT_ACCESS_SECRET_KEY
      );
      console.log(payload);
      req.userId = payload.id;

      next();
    } catch (err) {
      next(err);
    }
  };

  validateInsertRequest = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const access_token = authorization.split(' ')[1];

      const payload = jwt.verify(
        access_token,
        process.env.JWT_ACCESS_SECRET_KEY
      );

      req.body.userId = payload.id;

      const validTodo = await insertTaskSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      console.log(validTodo);
      next();
    } catch (err) {
      next(err);
    }
  };

  validateUpdateRequest = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const access_token = authorization.split(' ')[1];

      const payload = jwt.verify(
        access_token,
        process.env.JWT_ACCESS_SECRET_KEY
      );

      req.body.userId = payload.id;

      const validTodo = await updateTaskSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      console.log(validTodo);
      next();
    } catch (err) {
      next(err);
    }
  };

  validateDeleteRequest = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const access_token = authorization.split(' ')[1];

      const payload = jwt.verify(
        access_token,
        process.env.JWT_ACCESS_SECRET_KEY
      );

      req.userId = payload.id;
      next();
    } catch (err) {
      next(err);
    }
  };

  validateDeleteAllRequest = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const access_token = authorization.split(' ')[1];

      console.log(access_token);

      const payload = jwt.verify(
        access_token,
        process.env.JWT_ACCESS_SECRET_KEY
      );

      req.userId = payload.id;
      next();
    } catch (err) {
      next(err);
    }
  };

  validateSearchRequest = async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      const access_token = authorization.split(' ')[1];

      console.log(access_token);

      const payload = jwt.verify(
        access_token,
        process.env.JWT_ACCESS_SECRET_KEY
      );

      req.userId = payload.id;

      const validTodo = await searchTaskSchema.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      console.log(validTodo);
      next();
    } catch (err) {
      next(err);
    }
  };
}
