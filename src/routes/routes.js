import express from 'express'
import {
  saveTodo,
  getAllTodos,
  deleteAllTodos,
  deleteTodo,
} from '../controller/controller.js'

const route = express.Router()

// Home Page Response

route.all('/', (req, res) => {
  res.send(
    '<h1>Welcome to the Home Page of Your Personalized To-Do Application</h1>'
  )
})

route.get('/tasks', getAllTodos)

route.post('/tasks', saveTodo)

// route.put('/tasks/:id', updateTask)

route.delete('/tasks/:id', deleteTodo)

route.delete('/tasks', deleteAllTodos)

// route.get('/tasks/search', searchTask)

export default route
