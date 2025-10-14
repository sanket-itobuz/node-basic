import Task from '../model/todo.js';

export default class ToDoOperations {
  getAllTodos = async (req, res, next) => {
    try {
      const userId = req.userId;
      const allTodos = await Task.find({ userId });

      res.status(200).json(allTodos);
    } catch (err) {
      next(err);
    }
  };

  saveTodo = async (req, res, next) => {
    try {
      const newTodo = req.body;
      const todo = await Task.create(newTodo);

      res
        .status(200)
        .json({ message: 'Todo Successfully Added', success: true });
      console.log(todo);
    } catch (err) {
      next(err);
    }
  };

  editTodo = async (req, res, next) => {
    try {
      const editTodo = req.body;
      const id = req.body.id;
      const userId = req.body.userId;

      const updatedTask = await Task.updateOne(
        { _id: id, userId },
        editTodo,
        { new: true, runValidators: true } // Update options
      );

      if (!updatedTask) {
        return res
          .status(404)
          .json({ message: 'Task not found', success: false });
      }

      res.status(200).json({
        message: 'Task Updated Successfully',
        success: true,
        updatedTask,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteTodo = async (req, res, next) => {
    try {
      const id = req.params.id;
      // const userId = req.userId;

      const deletedItem = await Task.findByIdAndDelete(id);

      res.status(200).json({
        message: `Todo with id : ${id} successfully Deleted`,
        success: true,
        deletedItem,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteAllTodos = async (req, res, next) => {
    try {
      const userId = req.userId;

      console.log(userId);

      const allTodos = await Task.deleteMany({ userId });

      res.status(200).json({
        message: 'All Todos successfully Deleted',
        success: true,
        todos: allTodos,
      });
    } catch (err) {
      next(err);
    }
  };

  searchTodos = async (req, res, next) => {
    try {
      const userId = req.userId;
      const searchTitle = req.query.title;
      const searchTag = req.query.tag;

      let filteredTodos;

      if (searchTitle || searchTag) {
        filteredTodos = await Task.find()
          .byUserId(userId)
          .byTitle(searchTitle)
          .byTag(searchTag);
      }

      res.json(filteredTodos);
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
