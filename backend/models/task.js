import mongoose from "mongoose";
import { prioritySchema } from "./priority.js";
import { statusSchema } from "./status.js";

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  priority: {
    type: prioritySchema,
    required: true,
  },
  status: {
    type: statusSchema,
    required: true,
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

const Task = mongoose.model("task", taskSchema);

export default Task;
