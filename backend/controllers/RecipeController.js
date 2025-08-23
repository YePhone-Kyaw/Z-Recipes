const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");

const RecipeController = {
  index: async (req, res) => {
    const limit = 6;
    const page = Math.max(1, req.query.page || 1);
    try {
      const recipes = await Recipe.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      const totalRecipeCount = await Recipe.countDocuments();
      const totalPagesCount = Math.ceil(totalRecipeCount / limit);

      const links = {
        nextPage: page == totalPagesCount ? false : true,
        previousPage: page == 1 ? false : true,
        currentPage: page,
        loopableLinks: [],
      };

      //generate loopable links array
      for (let i = 0; i < totalPagesCount; i++) {
        const pageNumber = i + 1;
        links.loopableLinks.push({ number: pageNumber });
      }

      const response = {
        links,
        data: recipes,
      };

      return res.json(response);
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

  upload: async (req, res) => {
    try {
      console.log(req.file);
      return res.json({Image: "uploaded"});
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = RecipeController;
