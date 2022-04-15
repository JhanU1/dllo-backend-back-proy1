import { Router } from "express";
import data from "../utils/data.js";

const router = Router();

router.get("/",  (req, res) => {
  res.status(200).json(data.users);
});

router.get("/:id",  (req, res) => {
  const user = await data.users.find(user => user.id === req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.post("/login",(req, res) => {
  const { username, password } = req.body;
  const user = await data.users.find(user => user.username === username && user.password === password);
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
      const user = data.users.find(user => user.id === user_id);
      if (user) {
        const duration = Date.parse(user.token.date) - Date.now().getTime();
        console.log(duration);
        if (duration < 1800000) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User token expired" });
        }
      } else {
        res.status(404).send({ message: "User not found" });
      }
    }
  }
  res.status(404).send({ message: "user_id is undefined" });
});

router.post("/register", (req, res) => {
  const { display_name, username, password } = req.body;
  // Fail if the fields are not completed
  const userExist = data.users.find(user => user.username === username);
  if (!username || !password || !display_name) {
    res.status(400).json({ message: "Please provide name and password" });
  } else {
    if (!userExist) {
      const user = {
        display_name,
        username,
        password,
        token: {
          val: "asd",
          date: Date.now().toString(),
        },
      };
      data.users.push(user);
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "User already exists" });
    }
  }
});

export default router;
