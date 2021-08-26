import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import express from "express";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      name: user.name,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({ message: "Invalid user or password" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      name: user.name,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

// router.get("/:search", async (req, res) => {
//   const regex = new RegExp(req.params.search, "i");
//   const users = await User.find({ email: regex }).select("-password -boards");
//   res.send(users);
// });

// router.get("/", async (req, res) => {
//   const users = await User.find().select("-password -boards");
//   res.send(users);
// });

export default router;
