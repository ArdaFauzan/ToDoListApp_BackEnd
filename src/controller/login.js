const jwt = require('jsonwebtoken');
require('dotenv').config();
const loginModels = require('../models/login');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [getData] = await loginModels.getUserByEmail(email);
        const user = getData[0];

        if (!user || email !== user.email) {
            return res.status(400).json({
                message: 'Email tidak ditemukan'
            });
        }

        const comparedPassword = await bcrypt.compare(password, user.password);

        if (comparedPassword) {
            const secretKey = process.env.SECRET_KEY;

            const payload = {
                userId: user.id,
                email: user.email
            };

            const token = jwt.sign(payload, secretKey);

            res.status(200).json({
                message: 'Login berhasil',
                token: token
            });
        } else {
            res.status(400).json({
                message: 'Password salah'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message
        });
    }
};

const getUserName = async (req, res) => {
    const { email } = req.params

    try {
        const [name] = await loginModels.getUserName(email)
        console.log(name)

        res.status(200).json({
            message: 'Get name success',
            data: name
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message
        })
    }
}

module.exports = { loginUser, getUserName };
