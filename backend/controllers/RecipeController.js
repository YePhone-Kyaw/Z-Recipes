const RecipeController = {
    index : (req, res) => {
        return res.json({message : "Get all recipes."})
    },
    store : (req, res) => {
        return res.json({message : "store recipes."})
    },
    show : (req, res) => {
        return res.json({message : "Get single recipe."})
    },
    destroy : (req, res) => {
        return res.json({message : "Delete single recipe."})
    },
    update : (req, res) => {
        return res.json({message : "Update recipe."})
    }
}

module.exports = RecipeController;