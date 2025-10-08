import fileio from '../utility/fileio.js'
import taskSchema from '../schema/taskSchema.js'

export const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await fileio.readTasks()
    res.send(allTasks)
  } catch (err) {
    next(err)
  }
}

export const saveTask = async (req, res, next) => {
  try {
    const tasks = await fileio.readTasks()
    const newTask = req.body
    const task = await taskSchema.validate(newTask, { abortEarly: false })
    tasks.push(task)
    await fileio.writeTasks(tasks)
    res.send('Task Added Successfully')
  } catch (err) {
    next(err)
  }
}

export const updateTask = async (req, res, next) => {
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
    next(err)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    let tasks = await fileio.readTasks()
    const id = req.params.id

    let deleteIndex = -1
    deleteIndex = tasks.findIndex((task) => task.id === id)

    if (deleteIndex == -1) {
      res.status(404).send('Task Not Found')
    }

    tasks.splice(deleteIndex, 1)

    await fileio.writeTasks(tasks)
    res.send('Task Deleted Successfully')
  } catch (err) {
    next(err)
  }
}

export const deleteAllTasks = async (req, res, next) => {
  try {
    await fileio.writeTasks([])
    res.send('All Tasks Deleted Successfully')
  } catch (err) {
    next(err)
  }
}

export const searchTask = async (req, res, next) => {
  try {
    let tasks = await fileio.readTasks()
    const searchTitle = req.query.title
    const searchTag = req.query.tag
    let filteredTasks = tasks

    if (
      (searchTitle && searchTitle.trim() !== '') ||
      (searchTag && searchTag.trim() !== '')
    ) {
      const lowerCaseSearchTitle = searchTitle ? searchTitle.toLowerCase() : ''
      const lowerCaseSearchTag = searchTag ? searchTag.toLowerCase() : ''

      filteredTasks = tasks.filter((task) => {
        const titleMatch = searchTitle
          ? task.title?.toLowerCase().includes(lowerCaseSearchTitle)
          : true
        const tagMatch = searchTag
          ? task.tags?.includes(lowerCaseSearchTag)
          : true

        return titleMatch && tagMatch
      })
    }
    res.json(filteredTasks)
  } catch (err) {
    next(err)
  }
}
