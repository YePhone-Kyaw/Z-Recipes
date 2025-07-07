const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const recipeRoutes = require("./routes/recipes");
const mongoose = require("mongoose");

const app = express();
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("connected to db");
  app.listen(process.env.PORT, () => {
    console.log("app is listening at port 4000...");
  });
});

app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({ hi: "Hello World" });
});

app.use("/api/recipes", recipeRoutes);
