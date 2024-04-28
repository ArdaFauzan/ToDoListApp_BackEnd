const { nanoid } = require('nanoid');
const registerModels = require('../models/register');
const bcrypt = require('bcryptjs');

const registerNewUser = async (req, res) => {
    const id = nanoid(8);
    const data = req.body;
    let hashedPassword = await bcrypt.hash(data.password)

    try {
        const checkEmail = await registerModels.checkEmail(data.email);
        if (checkEmail.length > 0) {
            return res.status(400).json({
                message: 'Email is already in use'
            });
        } else if (data.password !== data.passwordConfirm) {
            return res.status(400).json({
                message: 'Passwords do not match'
            });
        }

        try {
            await registerModels.createNewUser(id, data, hashedPassword);
            res.status(201).json({
                message: 'Create new user success',
                data: data
            });
        } catch (error) {
            res.status(500).json({
                message: 'Server Error',
                serverMessage: error.message
            });
        }
       
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message
        });
    }
};

module.exports = { registerNewUser };