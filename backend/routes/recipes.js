const express = require('express');
const RecipeController = require('../controllers/RecipeController');
const router = express.Router();
const { body } = require('express-validator');
const handleErrorMessage = require('../middlewares/handleErrorMessage');
 
// Get all recipes
router.get('', RecipeController.index);

//add single recipe
router.post('', [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('ingredients').notEmpty().isArray({min : 3})
], handleErrorMessage, RecipeController.store)

// Get single recipe
router.get('/:id', RecipeController.show)

// Delete single recipe
router.delete('/:id', RecipeController.destroy)

// Update recipe
router.patch('/:id', RecipeController.update)

module.exports = router;