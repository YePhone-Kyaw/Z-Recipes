const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const recipeRoutes = require("./routes/recipes");
const usersRoutes = require("./routes/users");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const AuthMiddleware = require("./middlewares/AuthMiddleware");
const app = express();
const nodemailer = require("nodemailer");


app.use(express.static("public"));

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

app.use("/api/recipes",AuthMiddleware, recipeRoutes);
app.use("/api/users", usersRoutes);

app.get('/send-email', async (req, res) => {
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5779666eb87085",
    pass: "ab6ee6a39a7549"
  }
});
  const info = await transport.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent:", info.messageId);
  return res.send("Email already send")
});

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
