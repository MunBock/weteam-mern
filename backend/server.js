import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import priorities from "./routes/priorities.js";
import statuses from "./routes/statuses.js";
import users from "./routes/users.js";
import tasks from "./routes/tasks.js";
import boards from "./routes/boards.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/api/priorities", priorities);
app.use("/api/statuses", statuses);
app.use("/api/users", users);
app.use("/api/tasks", tasks);
app.use("/api/boards", boards);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(
      PORT,
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
      )
    )
  )
  .catch((error) => console.log(`${error}`));
