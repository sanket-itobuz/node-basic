import express from 'express';
import ToDoOperations from '../controller/taskController.js';
import ToDoValidations from '../validate/taskValidator.js';

const route = express.Router();

const todoRequestValidation = new ToDoValidations();
const todoRequestOperations = new ToDoOperations();

route.get(
  '/fetch',
  todoRequestValidation.validateFetchRequest,
  todoRequestOperations.getAllTodos
);

route.post(
  '/save',
  todoRequestValidation.validateInsertRequest,
  todoRequestOperations.saveTodo
);

route.put(
  '/edit',
  todoRequestValidation.validateUpdateRequest,
  todoRequestOperations.editTodo
);

route.delete(
  '/delete/:id',
  todoRequestValidation.validateDeleteRequest,
  todoRequestOperations.deleteTodo
);

route.delete(
  '/clear',
  todoRequestValidation.validateDeleteAllRequest,
  todoRequestOperations.deleteAllTodos
);

route.get(
  '/search',
  todoRequestValidation.validateSearchRequest,
  todoRequestOperations.searchTodos
);

route.get('/sort', todoRequestOperations.sortTodos);

export default route;
