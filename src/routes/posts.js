import { Router } from "express";
import data from "../utils/data.js";

const router = Router();

router.get("/",  (req, res) => {
  res.status(200).json(data.posts);
});

router.get("/:id",  (req, res) => {
  const post = await data.posts.find(post => post.id === req.params.id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "post not found" });
  }
});