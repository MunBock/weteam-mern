import Board from "../models/board.js";

export default async function (req, res, next) {
  const boardId = req.header("boardId");
  const board = await Board.findById(boardId);

  if (!board) {
    return res.status(404).json({ msg: "Board not found" });
  }

  const members = board.members.map((member) => member.user);
  if (members.includes(req.user.id)) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You must be a member of this board to make changes" });
  }
}
