const express = require('express');
const RecipeController = require('../controllers/RecipeController');
const router = express.Router();

// Get all recipes
router.get('', RecipeController.index);

//add single recipe
router.post('', RecipeController.store)

// Get single recipe
router.get('/:id', RecipeController.show)

// Delete single recipe
router.delete('/:id', RecipeController.destroy)

// Update recipe
router.patch('/:id', RecipeController.update)

module.exports = router;