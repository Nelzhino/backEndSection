const jwt = require('jsonwebtoken');
const { Exceptions } = require('../helpers');
const { JWT_SECRET } = require('../config');

module.exports = function(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        Exceptions.exceptions({ status: 400, message: 'Token must be sent' });
    }

    jwt.verify(token, JWT_SECRET, function(err, decodedToken) {
        if (err) {
            Exceptions.exceptions({ status: 401, message: 'Invalid token' });
        }

        req.user = decodedToken.user;
        next();
    });
}