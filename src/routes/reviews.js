import { Router } from "express";
import data from "../utils/data.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json(data.reviews);
});

router.get("/:product_id/:user_id", (req, res) => {
  const user = data.users.find((user) => user.id === req.params.user_id);
  if (user) {
    const product = data.posts.find((product) => product.id === product_id);
    if (product) {
      const reviews = data.reviews.filter(
        (review) =>
          review.product_id === product.product_id &&
          review.user_id === user.user_id
      );
      if (reviews) {
        res.status(200).json(reviews);
      } else {
        res.status(200).json({ message: "No reviews found" });
      }
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// create a review {user_id, product_id, rating, description}
router.post("/", (req, res) => {
  const { product_id, user_id, rating, description } = req.body;
  if (!product_id || !user_id || !rating || !description) {
    res.status(400).json({ message: "Please provide all fields" });
  } else {
    const user = data.users.find((user) => user.id === user_id).cart;
    if (user) {
      const product = data.posts.find((product) => product.id === product_id);
      const review = {
        id: data.reviews.length + 1,
        product_id,
        user_id,
        rating,
        description,
      };
      if (product) {
        data.reviews.push(review);
        res.status(200).json(review);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
    F;
  }
});

router.delete("/:product_id/:user_id", (req, res) => {
  const user = data.users.find((user) => user.id === req.params.user_id);
  if (user) {
    const product = data.posts.find((product) => product.id === product_id);
    if (product) {
      const reviews = data.reviews.filter(
        (review) =>
          review.product_id !== product.product_id &&
          review.user_id === user.user_id
      );
      if (reviews) {
        data.reviews = reviews;
        res.status(200).json(data.reviews);
      } else {
        res.status(200).json({ message: "No reviews found" });
      }
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
