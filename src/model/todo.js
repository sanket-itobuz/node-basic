import mongoose from 'mongoose';

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
);

taskModel.query.byTitle = function (title) {
  return this.where({ title: new RegExp(title, 'i') });
};

taskModel.query.byTag = function (tag) {
  return this.where({ tags: new RegExp(tag, 'i') });
};

const task = mongoose.model('Task', taskModel);
export default task;
