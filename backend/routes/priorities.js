import { Priority } from "../models/priority.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const priorities = await Priority.find().select("-__v").sort("name");
  res.send(priorities);
});

router.post("/", async (req, res) => {
  let priority = new Priority({ name: req.body.name });
  priority = await priority.save();

  res.send(priority);
});

router.put("/:id", async (req, res) => {
  const priority = await Priority.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!priority)
    return res
      .status(404)
      .send("The priority with the given ID was not found.");

  res.send(priority);
});

router.delete("/:id", async (req, res) => {
  const priority = await Priority.findByIdAndRemove(req.params.id);

  if (!priority)
    return res
      .status(404)
      .send("The priority with the given ID was not found.");

  res.send(priority);
});

router.get("/:id", async (req, res) => {
  const priority = await Priority.findById(req.params.id).select("-__v");

  if (!priority)
    return res
      .status(404)
      .send("The priority with the given ID was not found.");

  res.send(priority);
});

export default router;
