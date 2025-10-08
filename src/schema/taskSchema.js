import * as yup from 'yup'

// Validating the data coming from Client Side to process further

export const insertTaskSchema = yup.object({
  title: yup.string(),
  description: yup.string().nullable().optional(),
  isCompleted: yup.boolean().default(false),
  isImportant: yup.boolean().required(),
  tags: yup.array().of(yup.string()),
})

export const updateTaskSchema = yup.object({
  title: yup.string().optional(),
  description: yup.string().optional(),
  isCompleted: yup.boolean().optional(),
})

export const searchTaskSchema = yup.object({
  title: yup.string().optional(),
  tag: yup.string(),
})
