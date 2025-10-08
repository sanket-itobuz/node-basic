import * as yup from 'yup'
import { v4 as uuidv4 } from 'uuid'

const taskSchema = yup.object({
  id: yup
    .string()
    .uuid()
    .default(() => uuidv4()),
  title: yup.string().required(),
  description: yup.string().nullable().optional(),
  createdAt: yup.date().default(() => new Date()),
  isCompleted: yup.boolean().default(false),
  isImportant: yup.boolean().required(),
  tags: yup.array().of(yup.string()),
  updatedAt: yup.date().nullable().default(null),
})

export default taskSchema
