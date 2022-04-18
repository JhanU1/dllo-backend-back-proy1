import { Router } from "express";
import data from "../utils/data.js";

const router = Router();

router.get("/", (req, res) => {
  const {product_id } = req.query;
  if (product_id) {
    const product = data.posts.find((product) => product._id === product_id);
    if (product) {
      const reviews = data.reviews.filter(
        (review) =>
          review.product_id === product._id 
      );
      if (reviews) {
        res.status(200).json(reviews);
      } else {
        res.status(200).json({ message: "No reviews found" });
      }
    }else{
      res.status(404).json({ message: "Product not found" });
    }

  } else {
    res.status(200).json(data.reviews);
  }
});

// create a review {user_id, product_id, rating, description}
router.post("/", (req, res) => {
  const { product_id, user_id, rating, description } = req.body;

  if (!product_id || !user_id || !rating || !description) {
    res.status(400).json({ message: "Please provide all fields" });
  } else {
    const user = data.users.find((user) => user._id === user_id);
    if (user) {

      const product = data.posts.find((product) => product._id === product_id);
      const review = {
        _id: data.reviews.length + 1,
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
  }
});

router.delete("/", (req, res) => {
  const { user_id, product_id } = req.query;
  if (user_id && product_id) {
    const user = data.users.find((user) => user._id === user_id);
    if (user) {
      const product = data.posts.find((product) => product._id === product_id);
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
  }
});

export default router;
