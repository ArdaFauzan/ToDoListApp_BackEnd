const jwt = require('jsonwebtoken');
require('dotenv').config();
const loginModels = require('../models/login');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [getData] = await loginModels.getUserByEmail(email);
        const user = getData[0]; // Dapatkan objek pengguna

        // Jika tidak ada data yang ditemukan, kirimkan pesan kesalahan
        if (!user || email !== user.email) {
            return res.status(400).json({
                message: 'Email tidak ditemukan'
            });
        }

        // Bandingkan password yang dimasukkan dengan yang ada di database
        const comparedPassword = await bcrypt.compare(password, user.password);

        // Jika perbandingan berhasil, proses pembuatan token
        if (comparedPassword) {
            const secretKey = process.env.SECRET_KEY;

            const payload = { 
                userId: user.id, 
                email: user.email
            };

            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

            res.cookie('authToken', token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000 // Cookie akan kadaluarsa setelah 1 jam
            });

            res.status(200).json({
                message: 'Login berhasil'
            });
        } else {
            // Jika password tidak cocok, kirimkan pesan kesalahan
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

module.exports = { loginUser };
