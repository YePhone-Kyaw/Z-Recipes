const express = require('express');
const RecipeController = require('../controllers/RecipeController');
const router = express.Router();
const { body } = require('express-validator');
const handleErrorMessage = require('../middlewares/handleErrorMessage');
const upload = require('../helpers/upload');
const AuthMiddleware = require('../middlewares/AuthMiddleware');
 
// Get all recipes
router.get('', RecipeController.index);

//add single recipe
router.post('', AuthMiddleware, [
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('ingredients').notEmpty().isArray({min : 1})
], handleErrorMessage, RecipeController.store)

// Add an image 
router.post('/:id/upload', [ 
    upload.single("photo"),
    body("photo").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Photo is required!");
        }
        if (!req.file.mimetype.startsWith("image")) {
            throw new Error("File must be an image!");
        }
        return true;
    }),
 ], handleErrorMessage, RecipeController.upload);

 // Get own created recipes
 router.get('/myRecipes', AuthMiddleware, RecipeController.myRecipies)

// Get single recipe
router.get('/:id', RecipeController.show)


// Delete single recipe
router.delete('/:id', RecipeController.destroy)

// Update recipe
router.patch('/:id', RecipeController.update)

module.exports = router;