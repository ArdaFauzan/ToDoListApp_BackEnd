const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/auth');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    let { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    console.log(token)

    if (!token) {
        return res.status(401).json({
            error: "A token is required for authentication",
            message: "A token is required for authentication"
        });
    }

    try {
        const decoded = jwt.verify(token,  process.env.SECRET_KEY);
        console.log(decoded)
        const user = await getUserByEmail(decoded.email);
        if (!user) {
            return res.status(400).json({
                message: 'Bad Request',
                error: 'User does not exist',
            });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Token is not valid",
            error: error.message
        });
    }
};

module.exports = verifyToken;