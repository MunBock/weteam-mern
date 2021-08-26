import mongoose from "mongoose";

const statusSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Status = mongoose.model("Status", statusSchema);

export { statusSchema, Status };
