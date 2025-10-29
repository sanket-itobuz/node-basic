import TaskSchema from '../schema/TaskSchema.js';

const taskSchema = new TaskSchema();

export default class TaskValidations {
  validateInsertRequest = async (req, res, next) => {
    try {
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

  validateSearchRequest = async (req, res, next) => {
    try {
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
