const { validationResult } = require('express-validator');

const handleErrorMessage = (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()) {
        return res.json({errors : result.mapped()});
    } else {
        next();
    }
}

module.exports = handleErrorMessage;