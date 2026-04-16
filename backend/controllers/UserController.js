const createToken = require("../helpers/createToken");
const User = require("../models/User");
const UserController = {
  me: async (req, res) => { 
    return res.send(req.user);
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      return res.json({ user, token });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.register(name, email, password);

      //create token
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      return res.json({ user, token });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
  logout: async (req, res) => {
    res.cookie('jwt', '', { maxAge : 1 });
    return res.json({ message : 'User logged out!' })
  },
  getFavourites: async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate("favourites");
      return res.json(user.favourites);
    } catch (e) {
      return res.status(500).json({ message: e.message })
    }
  },
  toggleFavourite: async (req, res) => {
    try {
      const { recipeId } = req.params;
      const user = await User.findById(req.user._id);
      const idx = user.favourites.findIndex((id) => id.toString() === recipeId);
      if (idx === -1) {
        user.favourites.push(recipeId);
      } else {
        user.favourites.splice(idx, 1);
      }
      await user.save();
      return res.json({ favourites: user.favourites });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
};

module.exports = UserController;
