const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const recipeRoutes = require("./routes/recipes");
const usersRoutes = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthMiddleware = require("./middlewares/AuthMiddleware");
const cron = require("node-cron");
const User = require("./models/User");
const sendEmail = require("./helpers/sendEmail");

const app = express();

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("connected to db");
  app.listen(process.env.PORT, () => {
    console.log("app is listening at port 4000...");
    cron.schedule("*/3 * * * * *", async () => {
      const userName = await User.findByIdAndUpdate(
        "687f047b2059d52295cc2335",
        {
          name: "Zayden" + " " + Math.ceil(Math.random() * 10),
        }
      );
    });
  });
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); //Only for local development;
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.render("email");
});

app.use("/api/recipes", AuthMiddleware, recipeRoutes);
app.use("/api/users", usersRoutes);

app.get("/send-email", async(req, res) => {
  try {
    await sendEmail({
      fileName: 'email',
      data: {
        name : "Zayden"
      },
      from: "yephonekyaw@gmail.com",
      to: 'yephonekyaw920@gmail.com',
      subject: 'Greeting Zayden'
    })
    return res.send("Email already send");
  } catch (error) {
    return res.status(500).json({
      message : error.message,
      status : 500,
    })
  }
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
