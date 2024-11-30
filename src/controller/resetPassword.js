const resetPasswordModels = require('../models/resetPassword');
const { encrypt } = require('../middleware/encrypted');

const checkNameAndEmail = async (req, res) => {
    const { name, email } = req.body

    try {
        const [getUser] = await resetPasswordModels.checkUser(email)
        const user = getUser[0]

        if (name !== user.name || email !== user.email) {
            return res.status(400).json({
                message: 'Email or Name not found'
            })
        } else {
            return res.status(200).json({
                message: 'Email and Name found'
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message
        });
    }

}

const createNewPassword = async (req, res) => {
    const { email } = req.params
    const { password, passwordConfirm } = req.body

    try {
        if (password !== passwordConfirm) {
            return res.status(400).json({
                message: 'Password do not match'
            });
        }

        const [getUser] = await resetPasswordModels.checkUser(email)
        const user = getUser[0]

        const encrypted = encrypt(password);
        await resetPasswordModels.updatePassword(encrypted.userPassword, user.id)
        res.status(200).json({
            message: 'Password successfully changed'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message
        });
    }
}

module.exports = { checkNameAndEmail, createNewPassword }