import { Router } from "express";
import data from "../utils/data.js";

const router = Router();

router.get("/", (req, res) => {
  const { user_id } = req.query;
  if (user_id) {
    const user = data.users.find((user) => user._id === user_id);
    if (user) {
      const history = data.histories.find(
        (history) => history.user_id === user_id
      );
      if (history) {
        res.status(200).json(history.products);
      } else {
        res.status(200).json([]);
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(200).json(data.carts);
  }
});

export default router;
