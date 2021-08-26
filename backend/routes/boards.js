import express from "express";
import Board from "../models/board.js";
import User from "../models/user.js";
import { auth } from "../middleware/auth.js";
import member from "../middleware/member.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;

    const newBoard = new Board({ title });
    const board = await newBoard.save();

    const user = await User.findById(req.user.id);
    user.boards.unshift(board.id);
    await user.save();

    board.members.push({ user: user.id, name: user.name });
    await board.save();

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const boards = [];
    for (const boardId of user.boards) {
      boards.push(await Board.findById(boardId));
    }

    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate(
      "tasks",
      "title description priority status member dueDate"
    );
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/member/:username", [auth, member], async (req, res) => {
  try {
    const boardId = req.header("boardId");
    const board = await Board.findById(boardId);

    const { username } = req.params;

    const user = await User.findOne({ name: username }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (board.members.map((member) => member.user).includes(user._id)) {
      return res.status(400).json({ message: "Already member of board" });
    }

    user.boards.unshift(board.id);
    await user.save();

    board.members.push({ user: user._id, name: user.name });
    await board.save();

    res.json(board.members);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
