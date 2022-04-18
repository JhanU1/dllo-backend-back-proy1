import e, { Router } from "express";
import data from "../utils/data.js";

const router = Router();

router.get("/", (req, res) => {
  const params = req.query;
  
  if (params.user_id) {
    const posts = data.posts.filter((post) => post.owner_id === params.user_id);
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "Posts not found" });
    }
  } else if (params.post_id) {
    const post = data.posts.find((post) => post._id === params.post_id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }

  } else {
    res.status(200).json(data.posts);
  }
});

router.get("/recent", (req, res) => {
  const posts = data.posts.length > 10 ? data.posts.slice(0, 10) : data.posts;

  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(404).json({ message: "posts not found" });
  }
});

router.post("/", (req, res) => {
  const { owner_id, img_url, display_name, description, price } = req.body;
  if (owner_id && img_url && display_name && description && price) {

    const post = {
      _id: `${data.posts.length + 1}`,
      owner_id,
      img_url,
      display_name,
      description,
      price,
    };


    data.posts.push(post);
    return res.status(200).json(post);
  } else {
    res.status(400).json({ message: "Please provide all fields" });
  }
});

export default router;
