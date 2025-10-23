import * as yup from 'yup';

// Validating the data coming from Client Side to process further

export default class TaskSchema {
  insertTaskSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().nullable().optional(),
    isCompleted: yup.boolean().default(false),
    isImportant: yup.boolean().required(),
    tags: yup.array().of(yup.string()),
    userId: yup.string().required(),
  });

  updateTaskSchema = yup.object({
    id: yup.string().optional().required(),
    title: yup.string().optional(),
    description: yup.string().optional(),
    isCompleted: yup.boolean().optional(),
  });

  searchTaskSchema = yup.object({
    title: yup.string().optional(),
    tag: yup.string(),
  });
}
