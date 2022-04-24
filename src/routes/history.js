import { Router } from "express";
import {
  getHistories,
  getUserHistory,
} from "../utils/database/models/history.js";
import { getUserById } from "../utils/database/models/user.js";

const router = Router();

router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  if (user_id) {
    const user = await getUserById(user_id);
    if (user) {
      const history = await getUserHistory(user_id);
      if (history) {
        let products = history.carts.map((cart) => {
          return cart.products;
        });
        if (products) {
          res.status(200).json(products.flat(2));
        } else {
          res.status(200).json([]);
        }
      } else {
        res.status(200).json([]);
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
});

router.get("/", async (req, res) => {
  const histories = await getHistories();
  res.status(200).json(histories);
});

export default router;
