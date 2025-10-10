import {
  insertTaskSchema,
  searchTaskSchema,
  updateTaskSchema,
} from '../schema/taskSchema.js'

export default class ToDoValidations {
  validateInsertRequest = async (req, res, next) => {
    try {
      const validTodo = await insertTaskSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })
      console.log(validTodo)
      next()
    } catch (err) {
      next(err)
    }
  }

  validateUpdateRequest = async (req, res, next) => {
    try {
      const validTodo = await updateTaskSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      })
      console.log(validTodo)
      next()
    } catch (err) {
      next(err)
    }
  }

  validateSearchRequest = async (req, res, next) => {
    try {
      const validTodo = await searchTaskSchema.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
      })
      console.log(validTodo)
      next()
    } catch (err) {
      next(err)
    }
  }
}
