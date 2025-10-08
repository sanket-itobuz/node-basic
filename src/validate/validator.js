const validateInsert = async (schema, object, next) => {
  try {
    const validTodo = await schema.validate(object, {
      abortEarly: false,
    })
    console.log(validTodo)
    return validTodo
  } catch (err) {
    next(err)
  }
}

export default validateInsert
