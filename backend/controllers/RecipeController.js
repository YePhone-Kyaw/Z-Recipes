const { Result } = require("express-validator");
const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");
const removeFile = require("../helpers/removeFile");
const sendEmail = require("../helpers/sendEmail");
const User = require("../models/User");

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
   try {
    const { title, description, ingredients } = req.body;

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
    });
    const users = await User.find(null, ['email']);
    const userEmail = (users.map(user => user.email));
    const filteredEmails = userEmail.filter(email => email !== req.user.email);

    await sendEmail({
      fileName : 'email',
      data : {
        name : req.user.name,
        recipe,
      },
      from : req.user.email,
      to : filteredEmails,
      subject : `New Recipe called ${recipe.title} has been added to Z-Recipe`,
    })
    return res.json(recipe);
   } catch (e) {
    return res.status(500).json({ message : e.message }) ;
   }
  },
  show: async (req, res) => {
    try {
      const id = req.params.id;
      // validate the valid id or not
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id" });
      }
      const recipe = await Recipe.findById(id);
      // check the recipe exists in db or not even though the id might be valid format
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      return res.json(recipe);
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
      const recipe = await Recipe.findByIdAndDelete(id);

      removeFile(__dirname+"/../public/"+recipe.photo);

      // check the recipe exists in db or not even though the id might be valid format
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      return res.json(recipe);
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
      const recipe = await Recipe.findByIdAndUpdate(id, {
        ...req.body,
      });
      
      removeFile(__dirname+"/../public/"+recipe.photo);
      // check the recipe exists in db or not even though the id might be valid format
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      return res.json(recipe);
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  upload: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id" });
      }
      const recipe = await Recipe.findByIdAndUpdate(id, {
        photo : "/"+req.file.filename,
      })
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found!" });
      }
      return res.json(recipe);
    } catch (e) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = RecipeController;
