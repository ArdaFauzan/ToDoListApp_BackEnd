const resetPasswordModels = require('../models/resetPassword');
const bcrypt = require('bcryptjs');

const checkNameAndEmail = async (req, res) => {
    const { name, email } = req.body

    try {
        const [getUser] = await resetPasswordModels.checkUser(name, email)
        const user = getUser[0]
        console.log(user)

        if (name !== user.name || email !== user.email) {
            return res.status(400).json({
                message: 'Email atau Nama tidak ditemukan'
            })
        } else {
            return res.status(200).json({
                message: 'Email dan Nama ditemukan'
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
    const { name, email } = req.params
    const { password, passwordConfirm } = req.body

    try {
        if (password !== passwordConfirm) {
            return res.status(400).json({
                message: 'Password do not match'
            });
        }

        const [getUser] = await resetPasswordModels.checkUser(name, email)
        const user = getUser[0]

        const hashedPassword = await bcrypt.hash(password, 10);
        await resetPasswordModels.updatePassword(hashedPassword, user.id)
        res.status(200).json({
            message: 'Password berhasil diubah'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message
        });
    }
}

module.exports = { checkNameAndEmail, createNewPassword }