const jwt = require("jsonwebtoken");
const User = require("../models/User");

const AuthMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedValue) => {
      if (error) {
        return res.status(401).json({ message: "Unauthenticated" });
      } else {
        User.findById(decodedValue._id).then(user => {
          req.user = user;
          next();
        })
      }
    });
  } else {
    return res.status(400).json({ message: "Token need to be provided!" });
  }
};

module.exports = AuthMiddleware;
