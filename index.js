import express from "express";

const app = express();

import usersRoute from "./src/routes/users.js";

const port = process.env.PORT || 8080;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/users", usersRoute);

app.listen(port);

console.log("Listening on port " + port);
