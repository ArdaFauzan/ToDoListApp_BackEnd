const { nanoid } = require('nanoid')
const registerModels = require('../models/register')

const registerNewUser = async (req, res) => {
    const { id } = nanoid(8)
    const data = req.body

    try {
        await registerModels.createNewUser(data, id)
        const checkEmail = await registerModels.checkEmail(data.email)

        if (checkEmail.length > 0) {
            res.status(400).json({
                message: 'Email is already use'
            })
        } else if (data.password !== data.passwordConfirm) {
            res.status(400).json({
                message: 'Password do not match'
            })
        } else {
            res.status(201).json({
                message: 'Create new user success',
                data: data
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

module.exports = { registerNewUser }