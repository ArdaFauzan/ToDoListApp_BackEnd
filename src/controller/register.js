const { nanoid } = require('nanoid');
const registerModels = require('../models/register');
const bcrypt = require('bcryptjs');
let userIdCounter = 0

const registerNewUser = async (req, res) => {
    const {name, email, password, passwordConfirm} = req.body;

    try {
        const [checkEmailResult] = await registerModels.checkEmail(email);
        if (checkEmailResult.length > 0) {
            return res.status(400).json({
                message: 'Email is already in use'
            });
        } else if (password !== passwordConfirm) {
            return res.status(400).json({
                message: 'Password do not match'
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const generateUserId = () => {
                userIdCounter++;
                const userId = `user-${userIdCounter.toString().padStart(2, '0')}`;
                return userId;
            }

            const id = generateUserId();

            await registerModels.createNewUser(id, name, email, hashedPassword, null);
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
