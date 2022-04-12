import data from "../utils/data.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send(data.users);
});

router.post("/register", (req, res) => {
  const { display_name, username, password } = req.body;
  // Fail if the fields are not completed
  if (!username || !password || !display_name) {
    res.status(400).json({ message: "Please provide name and password" });
  } else {
    if (!data.users.find((user) => user.username === username)) {
      data.users.push({ display_name, username, password });
      res.status(201).json({ message: "User created" });
    }
    res.status(400).json({ message: "User exits in bd" });
  }
});

export default router;
