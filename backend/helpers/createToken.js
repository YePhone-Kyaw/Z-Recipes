const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60; // for 3 days

module.exports = function createToken (_id) {
    return jwt.sign({_id}, 'mysecretkey' , { expiresIn : maxAge });
}