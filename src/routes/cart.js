import { Router } from "express";
import {
  getCart,
  addProductToCart,
  deleteProductFromCart,
  deleteCart,
  getCars,
} from "../utils/database/models/cart.js";
import { getUserById } from "../utils/database/models/user.js";
import { addCartToHistory } from "../utils/database/models/history.js";

const router = Router();

router.get("/", async (req, res) => {
  const { user_id } = req.query;
  if (user_id) {
    const user = await getUserById(user_id);
    if (user) {
      const cart = await getCart(user_id);
      if (cart) {
        res.status(200).json(cart.products);
      } else {
        res.status(200).json([]);
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    const carts = await getCars();
    res.status(200).json(carts);
  }
});

router.post("/buy", async (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    res.status(400).json({ message: "Please provide all fields" });
  } else {
    const user = await getUserById(user_id);
    if (user) {
      const cart = await getCart(user_id);
      if (cart) {
        await addCartToHistory(user_id, cart);
        await deleteCart(user_id);
        res.status(200).json({ message: "Products bought" });
      }
    }
  }
});

router.post("/", async (req, res) => {
  const { product_id, user_id } = req.body;
  if (product_id && user_id) {
    const user = await getUserById(user_id);
    if (user) {
      await addProductToCart(user_id, product_id);
      res.status(200).json({ message: "Product added to cart" });
    }
  } else {
    res.status(400).json({ message: "Please provide all fields" });
  }
});

router.delete("/", async (req, res) => {
  const { item_id } = req.query;
  if (item_id) {
    await deleteProductFromCart(item_id);
    res.status(200).json({ message: "Product deleted from cart" });
  } else {
    res.status(400).json({ message: "Please provide all fields" });
  }
});

export default router;
