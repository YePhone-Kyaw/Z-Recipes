const Recipe = require("../models/Recipe");

const RecipeController = {
  index: (req, res) => {
    return res.json({ message: "Get all recipes." });
  },
  store: async (req, res) => {
    try {
      const { title, description, ingredients } = req.body;

      const recipe = await Recipe.create({
        title,
        description,
        ingredients,
      });
      return res.json(recipe);
    } catch (e) {
      return res.status(400).json({ message: "invalid fields" });
    }
  },
  show: (req, res) => {
    return res.json({ message: "Get single recipe." });
  },
  destroy: (req, res) => {
    return res.json({ message: "Delete single recipe." });
  },
  update: (req, res) => {
    return res.json({ message: "Update recipe." });
  },
};

module.exports = RecipeController;
