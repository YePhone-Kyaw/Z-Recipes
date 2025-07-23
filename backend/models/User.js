const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const UserSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    }
});

// creating a custom register method for api
UserSchema.statics.register = async function (name, email, password) {
    const userExists = await this.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt();
    const hashValue = await bcrypt.hash(password, salt);

    const user = await this.create({
      name,
      email,
      password: hashValue,
    });
    return user;
}


// create a custom login method for api
UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error("User does not exist!");
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
        return user;
    } else {
        throw new Error('Incorrect password!');
    }
}

module.exports = mongoose.model("User", UserSchema);