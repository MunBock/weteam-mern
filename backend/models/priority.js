import mongoose from "mongoose";

const prioritySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Priority = mongoose.model("Priority", prioritySchema);

export { prioritySchema, Priority };
