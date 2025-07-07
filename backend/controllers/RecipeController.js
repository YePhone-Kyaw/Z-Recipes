const Recipe = require("../models/Recipe");

const RecipeController = {
  index: async (req, res) => {
    try {
      const recipes = await Recipe.find().sort({ createdAt: -1 });
      return res.json(recipes);
    } catch (e) {
      return res.status(400).json({ message: "Error at retrieving data" });
    }
  },
  store: async (req, res) => {
    const { title, description, ingredients } = req.body;

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
    });
    return res.json(recipe);
  },
  show: async (req, res) => {
    try {
      const id = req.params.id;
      const showRecipe = await Recipe.findById(id);
      return res.json(showRecipe);
    } catch (e) {
      return res.status(404).json({ message: "Recipe not found" });
    }
  },
  destroy: (req, res) => {
    return res.json({ message: "Delete single recipe." });
  },
  update: (req, res) => {
    return res.json({ message: "Update recipe." });
  },
};

module.exports = RecipeController;
