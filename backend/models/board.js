import mongoose from "mongoose";
import { prioritySchema } from "./priority.js";
import { statusSchema } from "./status.js";

const boardSchema = mongoose.Schema({
  title: { type: String },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  ],
  members: [
    {
      _id: false,
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
