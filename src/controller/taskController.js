import Task from '../model/task.js';

export default class TaskController {
  getAllTodos = async (req, res, next) => {
    try {
      const userId = req.userId;

      const allTodos = await Task.find({ userId });

      res.status(200).json(allTodos);
    } catch (err) {
      res.status(400);
      next(err);
    }
  };

  saveTodo = async (req, res, next) => {
    try {
      const newTodo = req.body;
      const todo = await Task.create(newTodo);

      res
        .status(200)
        .json({ message: 'Task Successfully Added', success: true });

      console.log(todo);
    } catch (err) {
      res.status(400);
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
        res.status(404);
        throw new Error('Task not found');
      }

      res.status(200).json({
        message: 'Task Updated Successfully',
        success: true,
        updatedTask,
      });
    } catch (err) {
      res.status(400);
      next(err);
    }
  };

  deleteTodo = async (req, res, next) => {
    try {
      const id = req.params.id;

      const deletedItem = await Task.findByIdAndDelete(id);

      res.status(200).json({
        message: `Task Successfully Deleted`,
        success: true,
        deletedItem,
      });
    } catch (err) {
      res.status(400);
      next(err);
    }
  };

  deleteAllTodos = async (req, res, next) => {
    try {
      const userId = req.userId;

      const allTodos = await Task.deleteMany({ userId });

      console.log(allTodos);

      res.status(200).json({
        message: 'All Tasks successfully Deleted',
        success: true,
      });
    } catch (err) {
      res.status(400);
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

      res.status(200).json(filteredTodos);
    } catch (err) {
      res.status(400);
      next(err);
    }
  };

  sortTodos = async (req, res, next) => {
    try {
      const allTodos = await Task.find().sort({
        isImportant: 'desc',
        isCompleted: 'asc',
      });

      res.status(200).json(allTodos);
    } catch (err) {
      res.status(400);
      next(err);
    }
  };
}
