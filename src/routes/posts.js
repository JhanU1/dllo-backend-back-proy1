import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  recentPosts,
} from "../utils/database/models/post.js";
import { getUserById, getUserPosts } from "../utils/database/models/user.js";

const router = Router();

router.get("/", async (req, res) => {
  const params = req.query;

  if (params.user_id) {
    const user = await getUserById(params.user_id);
    if (user) {
      const posts = await getUserPosts(user._id);
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "Posts not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else if (params.post_id) {
    const post = await getPostById(params.post_id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } else {
    const posts = await getPosts();
    res.status(200).json(posts);
  }
});

router.get("/recent", async (req, res) => {
  const posts = await recentPosts();
  if (posts) {
    res.status(200).json(posts);
  } else {
    res.status(404).json({ message: "posts not found" });
  }
});

router.post("/", async (req, res) => {
  const { owner_id, img_url, display_name, description, price } = req.body;
  if (owner_id && img_url && display_name && description && price) {
    const user = await getUserById(owner_id);
    if (user) {
      const post = {
        owner_id,
        img_url,
        display_name,
        description,
        price,
      };
      const newPost = await createPost(post);
      return res.status(200).json(newPost);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(400).json({ message: "Please provide all fields" });
  }
});

export default router;
