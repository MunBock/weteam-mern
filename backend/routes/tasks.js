import Task from "../models/task.js";
import { Priority } from "../models/priority.js";
import { Status } from "../models/status.js";
import express from "express";
import Board from "../models/board.js";
import { auth } from "../middleware/auth.js";
import member from "../middleware/member.js";

const router = express.Router();

router.post("/", [auth, member], async (req, res) => {
  const boardId = req.header("boardId");

  const priority = await Priority.findById(req.body.priority);
  if (!priority) return res.status(400).send("Invalid Priority.");

  const status = await Status.findById(req.body.status);
  if (!status) return res.status(400).send("Invalid Status.");

  const newTask = new Task({
    title: req.body.title,
    description: req.body.description,
    priority: {
      _id: priority._id,
      name: priority.name,
    },
    status: {
      _id: status._id,
      name: status.name,
    },
    member: req.body.member,
    dueDate: Date.parse(req.body.dueDate),
  });

  const task = await newTask.save();

  const board = await Board.findById(boardId);
  board.tasks.push(task.id);

  await board.save();

  res.status(200).json(task);
});

router.put("/:id", async (req, res) => {
  const priority = await Priority.findById(req.body.priority);
  if (!priority) return res.status(400).send("Invalid Priority.");

  const status = await Status.findById(req.body.status);
  if (!status) return res.status(400).send("Invalid Status.");

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      priority: {
        _id: priority._id,
        name: priority.name,
      },
      status: {
        _id: status._id,
        name: status.name,
      },
      member: req.body.member,
      dueDate: Date.parse(req.body.dueDate),
    },
    { new: true }
  );

  if (!task)
    return res.status(404).send("The task with the given ID was not found.");

  res.send(task);
});

router.delete("/:id", async (req, res) => {
  const boardId = req.header("boardId");

  const task = await Task.findByIdAndRemove(req.params.id);

  if (!task)
    return res.status(404).send("The task with the given ID was not found.");

  const board = await Board.findById(boardId);

  board.tasks.splice(board.tasks.indexOf(req.params.id), 1);

  await board.save();

  res.send(task);
});

export default router;
