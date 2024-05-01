const { nanoid } = require('nanoid');
const registerModels = require('../models/register');
const bcrypt = require('bcryptjs');

const registerNewUser = async (req, res) => {
    const data = req.body;

    try {
        const [checkEmailResult] = await registerModels.checkEmail(data.email);
        const user = checkEmailResult[0]
        if (user || email === user.email) {
            return res.status(400).json({
                message: 'Email is already in use'
            });
        } else if (data.password !== data.passwordConfirm) {
            return res.status(400).json({
                message: 'Password do not match'
            });
        } else {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const id = nanoid(10);

            await registerModels.createNewUser(id, data.name, data.email, hashedPassword);
            res.status(201).json({
                message: 'Create new user success',
                data: {
                    id: id,
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    hashedPassword: hashedPassword
                }
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
