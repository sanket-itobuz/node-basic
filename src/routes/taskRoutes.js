import express from 'express';
import ToDoOperations from '../controller/taskController.js';
import ToDoValidations from '../validate/taskValidator.js';

const route = express.Router();

const todoRequestValidation = new ToDoValidations();
const todoRequestOperations = new ToDoOperations();

route.get('/tasks', todoRequestOperations.sortTodos);

route.post(
  '/tasks',
  todoRequestValidation.validateInsertRequest,
  todoRequestOperations.saveTodo
);

route.put(
  '/tasks',
  todoRequestValidation.validateUpdateRequest,
  todoRequestOperations.editTodo
);

route.delete('/tasks/:id', todoRequestOperations.deleteTodo);

route.delete('/tasks', todoRequestOperations.deleteAllTodos);

route.get(
  '/tasks/search',
  todoRequestValidation.validateSearchRequest,
  todoRequestOperations.searchTodos
);

route.get('/tasks/sort', todoRequestOperations.sortTodos);

export default route;
