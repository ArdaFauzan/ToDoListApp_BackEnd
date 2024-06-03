const registerModels = require('../models/register');
const bcrypt = require('bcryptjs');

const registerNewUser = async (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;

    try {
        const [getEmail] = await registerModels.checkEmail(email);
        const checkEmail = getEmail[0].count
        if (checkEmail > 0) {
            return res.status(400).json({
                message: 'Email is already in use'
            });
        } else if (password !== passwordConfirm) {
            return res.status(400).json({
                message: 'Password do not match'
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const [getNumber] = await registerModels.checkNumberId()

            const splitId = getNumber[0].id;
            const changeNumber = parseInt(splitId.substring('user-'.length));
            const id = `user-${changeNumber + 1}`

            await registerModels.createNewUser(id, name, email, hashedPassword);
            res.status(201).json({
                message: 'Create new user success',
                data: {
                    id: id,
                    name: name,
                    email: email,
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
