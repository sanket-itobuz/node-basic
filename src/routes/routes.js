import express from 'express'
import {
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  saveTask,
  updateTask,
} from '../controller/controller.js'

const route = express.Router()

// Home Page Response

route.all('/', (req, res) => {
  res.send(
    '<h1>Welcome to the Home Page of Your Personalized To-Do Application</h1>'
  )
})

route.get('/tasks', getAllTasks)

route.post('/tasks', saveTask)

route.put('/tasks/:id', updateTask)

route.delete('/tasks/:id', deleteTask)

route.delete('/tasks', deleteAllTasks)

export default route
