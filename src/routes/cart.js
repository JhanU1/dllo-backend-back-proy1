import { Router } from "express";
import data from "../utils/data.js";

const router = Router();

router.get("/", (req, res) => {
  const { user_id } = req.query;
  if (user_id) {
    const user = data.users.find((user) => user._id === user_id);
    if (user) {
      const cart = data.carts.find((cart) => cart.user_id === user_id);
      if (cart) {
        res.status(200).json(cart.products);
      } else {
        res.status(200).json([]);
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(200).json(data.carts);
  }
});

router.post("/", (req, res) => {
  const { product_id, user_id } = req.body;

  if (product_id && user_id) {
    const user = data.users.find((user) => user._id === user_id);
    if (user) {
      const cart = data.carts.find((cart) => cart.user_id === user_id);
      if (cart) {
        cart.products.push({ product_id });
        res.status(200).json({ message: "Product added to cart" });
      } else {
        data.carts.push({
          _id: `${data.carts.length + 1}`,
          products: [{product_id}],
          user_id,
        });
        res.status(200).json({ message: "Product added to cart" });
      }
    }
  } else {
    res.status(400).json({ message: "Please provide all fields" });
  }
});

router.delete("/", (req, res) => {
  const { product_id, user_id } = req.body;
  if (!product_id || !user_id) {
    res.status(400).json({ message: "Please provide all fields" });
  } else {
    const user = data.users.find((user) => user._id === user_id).cart;
    if (user) {
      const cart = data.carts.find((cart) => cart.user_id === user_id);
      if (cart) {
        cart.products = cart.products.filter(
          (product) => product.product_id === product_id
        );
        res.status(200).json({ message: "Product delete from cart" });
      }
    }
    res.status(200).json(user);
  }
});

router.post("buy", (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    res.status(400).json({ message: "Please provide all fields" });
  } else {
    const user = data.users.find((user) => user._id === user_id);
    if (user) {
      const cart = data.carts.find((cart) => cart.user_id === user_id);
      if (cart) {
        const history = data.history.find(
          (history) => history.user_id === user_id
        );
        if (history) {
          data.carts = data.carts.filter((cart) => cart.user_id !== user_id);
          history.products = history.products.concat(cart.products);
          res.status(200).json({ message: "Products bought" });
        } else {
          data.histories.push({
            _id: `${data.histories.length + 1}`,
            products: cart.products,
            user_id,
          });
          data.carts = data.carts.filter((cart) => cart.user_id !== user_id);
          res.status(200).json({ message: "Products bought" });
        }
      }
    }
  }
});

export default router;
