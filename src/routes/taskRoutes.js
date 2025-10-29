import express from 'express';
import TaskController from '../controller/TaskController.js';
import TaskValidations from '../validate/TaskValidations.js';

const route = express.Router();

const taskRequestValidation = new TaskValidations();
const taskRequestOperations = new TaskController();

route.get('/fetch', taskRequestOperations.getAllTodos);

route.post(
  '/save',
  taskRequestValidation.validateInsertRequest,
  taskRequestOperations.saveTodo
);

route.put(
  '/edit',
  taskRequestValidation.validateUpdateRequest,
  taskRequestOperations.editTodo
);

route.delete('/delete/:id', taskRequestOperations.deleteTodo);

route.delete('/clear', taskRequestOperations.deleteAllTodos);

route.get(
  '/search',
  taskRequestValidation.validateSearchRequest,
  taskRequestOperations.searchTodos
);

route.get('/sort', taskRequestOperations.sortTodos);

export default route;
