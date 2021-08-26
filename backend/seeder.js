import mongoose from "mongoose";
import dotenv from "dotenv";
import { Priority } from "./models/priority.js";
import { Status } from "./models/status.js";

dotenv.config();

const priorities = [
  {
    name: "High",
  },
  {
    name: "Medium",
  },
  {
    name: "Low",
  },
];

const statuses = [
  {
    name: "Not Started",
  },
  {
    name: "In Progress",
  },
  {
    name: "In Review",
  },
  {
    name: "Completed",
  },
  {
    name: "Blocked",
  },
  {
    name: "Cancelled",
  },
];

async function seeder() {
  await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  await Priority.deleteMany();
  await Status.deleteMany();

  for (let priority of priorities) {
    const newPriority = await new Priority({
      name: priority.name,
    });
    await Priority.insertMany(newPriority);
  }

  for (let status of statuses) {
    const newStatus = await new Status({
      name: status.name,
    });
    await Status.insertMany(newStatus);
  }

  mongoose.disconnect();

  console.log("Done!");
}

seeder();
