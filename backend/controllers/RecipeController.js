const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");

const RecipeController = {
  index: async (req, res) => {
    const limit = 12;
    const page = req.query.page || 1;
    try {
      const recipes = await Recipe.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }); 

      
        const totalRecipeCount = await Recipe.countDocuments();

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
      // validate the valid id or not
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id" });
      }
      const showRecipe = await Recipe.findById(id);
      // check the recipe exists in db or not even though the id might be valid format
      if (!showRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      return res.json(showRecipe);
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  destroy: async (req, res) => {
    try {
      const id = req.params.id;
      // validate the valid id or not
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id" });
      }
      const showRecipe = await Recipe.findByIdAndDelete(id);
      // check the recipe exists in db or not even though the id might be valid format
      if (!showRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      return res.json(showRecipe);
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      // validate the valid id or not
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id" });
      }
      const showRecipe = await Recipe.findByIdAndUpdate(id, {
        ...req.body,
      });
      // check the recipe exists in db or not even though the id might be valid format
      if (!showRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      return res.json(showRecipe);
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = RecipeController;
