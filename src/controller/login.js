const jwt = require('jsonwebtoken');
const loginModels = require('../models/login');
const { decrypt } = require('../middleware/encrypted');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [getEmail] = await loginModels.checkUserByEmail(email);
        const checkEmail = getEmail[0].count;

        if (checkEmail == 0) {
            return res.status(400).json({
                message: 'Email not found'
            });
        } else {
            const [getUserPassword] = await loginModels.getPassword(email);
            const encriptedPassword = getUserPassword[0].password;

            const [getUserIV] = await loginModels.getIV(email);
            const iv = getUserIV[0].iv;


            const decriptedPassword = decrypt(encriptedPassword, iv);

            const comparedPassword = decriptedPassword == password;


            if (comparedPassword) {
                const secretKey = process.env.SECRET_KEY;
                const [getUser] = await loginModels.getUserByEmail(email);
                const user = getUser[0];

                const payload = {
                    userId: user.id,
                    email: user.email
                };

                const token = jwt.sign(payload, secretKey);

                res.status(200).json({
                    message: 'Login Success',
                    token: token,
                    user_id: user.id,
                    name: user.name,
                });
            } else {
                res.status(400).json({
                    message: 'Password is wrong'
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message
        });
    }
};

module.exports = { loginUser };
