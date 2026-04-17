const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    photo : {
        type : String,
    },
    description : {
        type : String,
        required : true,
    },
    ingredients : {
        type : Array,
        required : true,
    },
    author : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {timestamps : true});


module.exports = mongoose.model("Recipe", RecipeSchema);