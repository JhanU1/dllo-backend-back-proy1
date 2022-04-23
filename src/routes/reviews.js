import { Router } from "express";
import {
  createReview,
  getReviews,
  getReviewsByProductIdAndUserId,
} from "../utils/database/models/review.js";

import { getUserById, getUserReviews } from "../utils/database/models/user.js";
import { getPostById, getPostReviews } from "../utils/database/models/post.js";

const router = Router();

router.get("/", async (req, res) => {
  const { product_id, user_id } = req.query;
  if (product_id && user_id) {
    const product = await getPostById(product_id);
    if (product) {
      const user = await getUserById(user_id);
      if (user) {
        const reviews = await getReviewsByProductIdAndUserId(
          product_id,
          user_id
        );
        res.status(200).json(reviews);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else if (product_id) {
    const product = await getPostById(product_id);
    if (product) {
      const reviews = await getPostReviews(product._id);
      console.log(reviews);
      res.status(200).json(reviews);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } else if (user_id) {
    const user = await getUserById(user_id);
    if (user) {
      const reviews = await getUserReviews(user_id);
      res.status(200).json(reviews);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  }
});

router.post("/", async (req, res) => {
  const { product_id, user_id, rating, description } = req.body;
  console.log(req.body);
  if (product_id && user_id && rating && description) {
    const user = await getUserById(user_id);
    if (user) {
      const product = await getPostById(product_id);
      if (product) {
        const review = {
          product_id,
          user_id,
          rating,
          description,
        };
        const newReview = await createReview(review);
        res.status(200).json(newReview);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(400).json({ message: "Please provide all fields" });
  }
});

export default router;
