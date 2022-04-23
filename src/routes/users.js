import { Router } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  getUserWithCredentials,
  getUserByUserName,
} from "../utils/database/models/user.js";

const router = Router();

router.get("/", async (req, res) => {
  const user_id = req.query.user_id;
  if (user_id) {
    const user = await getUserById(user_id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    const users = await getUsers();
    res.status(200).json(users);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = await getUserWithCredentials(username, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } else {
    res.status(400).json({ message: "Missing username or password" });
  }
});

router.post("/prev-login", async (req, res) => {
  const { user_id } = req.body;
  if (user_id) {
    if (user_id !== "undefined") {
      const user = await getUserById(user_id);
      console.log("prev-login", user);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    }
  }
  res.status(404).send({ message: "user_id is undefined" });
});

router.post("/register", async (req, res) => {
  const { display_name, username, password } = req.body;
  const userExist = await getUserByUserName(username);
  if (username && password && display_name) {
    if (!userExist) {
      const user = {
        display_name,
        username,
        password,
      };
      const newUser = await createUser(user);
      res.status(200).json(newUser);
    } else {
      res.status(400).json({ message: "User already exists" });
    }
  } else {
    res.status(400).json({ message: "Please provide name and password" });
  }
});

export default router;
