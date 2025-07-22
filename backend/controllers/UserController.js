const createToken = require("../helpers/createToken");
const User = require("../models/User");
const UserController = {
  login: (req, res) => {
    return res.json({ message: "register api hit" });
  },
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.register(name, email, password);

      //create token
      const token = createToken(user._id);
      res.cookie("jwt", token);

      return res.json({user, token});
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
};

module.exports = UserController;
