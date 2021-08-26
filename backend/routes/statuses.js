import { Status } from "../models/status.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const priorities = await Status.find().select("-__v").sort("name");
  res.send(priorities);
});

router.post("/", async (req, res) => {
  let status = new Status({ name: req.body.name });
  status = await status.save();

  res.send(status);
});

router.put("/:id", async (req, res) => {
  const status = await Status.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!status)
    return res.status(404).send("The status with the given ID was not found.");

  res.send(status);
});

router.delete("/:id", async (req, res) => {
  const status = await Status.findByIdAndRemove(req.params.id);

  if (!status)
    return res.status(404).send("The status with the given ID was not found.");

  res.send(status);
});

router.get("/:id", async (req, res) => {
  const status = await Status.findById(req.params.id).select("-__v");

  if (!status)
    return res.status(404).send("The status with the given ID was not found.");

  res.send(status);
});

export default router;
