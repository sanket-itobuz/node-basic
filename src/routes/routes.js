import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import fileio from '../utility/fileio.js'

const route = express.Router()

// Home Page Response

route.all('/', (req, res) => {
  res.send(
    '<h1>Welcome to the Home Page of Your Personalized To-Do Application</h1>'
  )
})

// GET request at /tasks to show all tasks

route.get('/tasks', async (req, res) => {
  try {
    const allTasks = await fileio.readTasks()
    res.send(allTasks)
  } catch (err) {
    console.log(err)
    res.statusCode(500).send('Internal Server Error while reading data')
  }
})

// POST request at /tasks to add new task at data.json file

route.post('/tasks', async (req, res) => {
  try {
    const tasks = await fileio.readTasks()
    const date = new Date()

    const newTask = {
      id: uuidv4(),
      title: req.body.title,
      description: req.body.description,
      createdAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      isCompleted: false,
      isImportant: req.body.isImportant,
      tags: req.body.tags || [],
      updatedAt: null,
    }
    tasks.push(newTask)
    await fileio.writeTasks(tasks)
    res.send('Task Added Successfully')
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

// PUT request at /tasks/:id to update task of specific :id

route.put('/tasks/:id', async (req, res) => {
  try {
    let tasks = await fileio.readTasks()
    const id = req.params.id

    // Find task by id
    let taskIndex = -1
    tasks.forEach((task) => {
      if (task.id === id) {
        taskIndex = task.id
      }
    })

    // Check if task index exists
    if (taskIndex === -1) {
      return res.status(404).send('Task not found')
    }
    let task = tasks[id]
    const date = new Date()

    // Update task fields
    let newTask = {
      id: task.id,
      title: req.body.title ?? task.title,
      description: req.body.description ?? task.description,
      createdAt: task.createdAt,
      isCompleted: req.body.isCompleted ?? task.isCompleted,
      isImportant: req.body.isImportant ?? task.isImportant,
      tags: task.tags,
      updatedAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    }
    tasks[id] = newTask
    await fileio.writeTasks(tasks)

    res.send('Task Updated Successfully')
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

route.delete('/tasks/:id', async (req, res) => {
  try {
    let tasks = await fileio.readTasks()
    const id = req.params.id

    let taskExists = false
    tasks.forEach((task) => {
      if (task.id === id) {
        taskExists = true
      }
    })

    if (!taskExists) {
      return res.status(404).send('Task not found')
    }

    tasks = tasks.filter((task) => task.id != id)

    await fileio.writeTasks(tasks)
    res.send('Task Deleted Successfully')
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default route
