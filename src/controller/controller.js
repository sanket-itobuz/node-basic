import Task from '../model/todo.js';

/** 

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

*/

export default class ToDoOperations {
  getAllTodos = async (req, res, next) => {
    try {
      const allTodos = await Task.find({});

      res.send(allTodos);
    } catch (err) {
      next(err);
    }
  };

  saveTodo = async (req, res, next) => {
    try {
      const newTodo = req.body;
      const todo = await Task.create(newTodo);

      res.send('Todo Successfully Added');
      console.log(todo);
    } catch (err) {
      next(err);
    }
  };

  editTodo = async (req, res, next) => {
    try {
      const editTodo = req.body;
      const id = req.body.id;
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        editTodo,
        { new: true, runValidators: true } // Update options
      );
      if (!updatedTask) {
        return res.status(404).send('Task not found');
      }
      res.json(updatedTask);
      console.log(editTodo);
    } catch (err) {
      next(err);
    }
  };

  deleteTodo = async (req, res, next) => {
    try {
      const id = req.params.id;
      await Task.findByIdAndDelete(id);
      res.send({ message: `Todo of ${id} successfully Deleted` });
    } catch (err) {
      next(err);
    }
  };

  deleteAllTodos = async (req, res, next) => {
    try {
      const allTodos = await Task.deleteMany({});
      res.json({ message: 'All Todos successfully Deleted', todos: allTodos });
    } catch (err) {
      next(err);
    }
  };

  searchTodos = async (req, res, next) => {
    try {
      const searchTitle = req.query.title;
      const searchTag = req.query.tag;

      let filteredTodos;

      if (searchTitle || searchTag) {
        filteredTodos = await Task.find().byTitle(searchTitle).byTag(searchTag);
      }
      res.send(filteredTodos);
    } catch (err) {
      next(err);
    }
  };

  sortTodos = async (req, res, next) => {
    try {
      const allTodos = await Task.find().sort({
        isImportant: 'desc',
        isCompleted: 'asc',
      });
      res.send(allTodos);
    } catch (err) {
      next(err);
    }
  };
}
