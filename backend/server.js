const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const recipeRoutes = require("./routes/recipes");
const usersRoutes = require("./routes/users");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("connected to db");
  app.listen(process.env.PORT, () => {
    console.log("app is listening at port 4000...");
  });
});

app.use(cors(
  {
    origin : 'http://localhost:5173',
    credentials : true
  }
)); //Only for local development;
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({ hi: "Hello World" });
});

app.use("/api/recipes", recipeRoutes);
app.use("/api/users", usersRoutes);

// app.get('/set-cookie', (req, res) => {
//   // res.setHeader('Set-Cookie', 'name=john');
//   res.cookie('name', 'john');
//   res.cookie('importantKey', 'importantValue', { httpOnly : true });
//   return res.send('cookie is already set');
// })

// app.get('/get-cookie', (req, res) => {
//   const cookies = req.cookies;
//   return res.json(cookies);
// })
