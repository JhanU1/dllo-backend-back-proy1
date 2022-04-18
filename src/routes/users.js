import { Router } from "express";
import data from "../utils/data.js";

const router = Router();

router.get("/", (req, res) => {
  const user_id = req.query.user_id;
  if (user_id) {
    const user = data.users.find((user) => user._id === user_id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(200).json(data.users);
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = data.users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

router.post("/prev-login", (req, res) => {
  const { user_id } = req.body;
  if (user_id) {
    if (user_id !== "undefined") {
      const user = data.users.find((user) => user._id === user_id);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    }
  }
  res.status(404).send({ message: "user_id is undefined" });
});

router.post("/register", (req, res) => {
  const { display_name, username, password } = req.body;
  // Fail if the fields are not completed
  const userExist = data.users.find((user) => user.username === username);
  if (!username || !password || !display_name) {
    res.status(400).json({ message: "Please provide name and password" });
  } else {
    if (!userExist) {
      const user = {
        _id: `${data.users.length + 1}`,
        display_name,
        username,
        password,
      };
      data.users.push(user);
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "User already exists" });
    }
  }
});

export default router;
