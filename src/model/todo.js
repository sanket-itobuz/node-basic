import mongoose from 'mongoose'

const taskModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
)

const task = mongoose.model('Task', taskModel)
export default task
