import Task from '../model/todo.js';

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
