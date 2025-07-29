const express = require('express');
const UserController = require('../controllers/UserController');
const handleErrorMessage = require('../middlewares/handleErrorMessage');
const { body } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

router.post('/login', UserController.login);

router.post('/register',  [
    body('name').notEmpty(),
    body('email').notEmpty().custom(async value => {
        const user = await User.findOne({email : value});
        if (user) {
            throw new Error('Email already in use.')
        }
    }),
    body('password').notEmpty()
], handleErrorMessage, UserController.register);

router.post('/logout', UserController.logout);


module.exports = router;
