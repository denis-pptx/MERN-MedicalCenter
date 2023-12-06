const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authorization = req.header('Authorization');

    if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.userId = payload.userId;
        next();
    });
};

module.exports = authMiddleware;
