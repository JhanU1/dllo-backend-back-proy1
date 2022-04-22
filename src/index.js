import express from "express";
import connectToDatabase from "./utils/database/connection.js";

const app = express();

import usersRoute from "./routes/users.js";
import postsRoute from "./routes/posts.js";
import cartRoute from "./routes/cart.js";
import historyRoute from "./routes/history.js";
import reviewsRoute from "./routes/reviews.js";

const port = process.env.PORT || 8080;

app.use(express.json());

const connection = connectToDatabase();

if (connection) {

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  app.use("/users", usersRoute);
  app.use("/posts", postsRoute);
  app.use("/cart", cartRoute);
  app.use("/history", historyRoute);
  app.use("/reviews", reviewsRoute);

  app.listen(port);

  console.log("Listening on port " + port);
} else {
  console.log("Imposible to run the server");
}
