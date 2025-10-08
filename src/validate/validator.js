export const validate = async (schema, object, next) => {
  try {
    const validTodo = await schema.validate(object, {
      abortEarly: false,
    })
    console.log(validTodo)
  } catch (err) {
    next(err)
  }
}
