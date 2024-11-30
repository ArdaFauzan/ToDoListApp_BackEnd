const registerModels = require('../models/register');
const { encrypt } = require('../middleware/encrypted');


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
            const encrypted = encrypt(password);

            const [getNumber] = await registerModels.checkNumberId()
            const number = getNumber[0].max_number
            const changeNumber = number + 1
            const id = `user-${changeNumber}`

            await registerModels.createNewUser(id, name, email, encrypted.userPassword);
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
        console.error(error);
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message
        });
    }
};

module.exports = { registerNewUser };
