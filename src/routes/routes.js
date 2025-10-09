import express from 'express'
import ToDoOperations from '../controller/controller.js'
import ToDoValidations from '../validate/validator.js'

const route = express.Router()

const requestValidation = new ToDoValidations()
const requestOperations = new ToDoOperations()

route.all('/', (req, res) => {
  res.send('Welcome to the Home Page of Your Personalized To-Do Application')
})

route.get('/tasks', requestOperations.getAllTodos)

route.post(
  '/tasks',
  requestValidation.validateInsertRequest,
  requestOperations.saveTodo
)

route.put(
  '/tasks',
  requestValidation.validateUpdateRequest,
  requestOperations.editTodo
)

route.delete('/tasks/:id', requestOperations.deleteTodo)

route.delete('/tasks', requestOperations.deleteAllTodos)

route.get(
  '/tasks/search',
  requestValidation.validateSearchRequest,
  requestOperations.searchTodos
)

export default route
