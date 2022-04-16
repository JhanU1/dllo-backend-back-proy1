import { Router } from "express";
import data from "../utils/data.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(data.carts);
});

router.get("/:user_id", (req, res) => {
  const user = data.users.find((user) => user.id === req.params.user_id);
  if (user) {
    const history = data.histories.find((history) => history.user_id === req.params.user_id);
    if(history) {
      res.status(200).json(history.products);
    } else {
      res.status(200).json([]);
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});