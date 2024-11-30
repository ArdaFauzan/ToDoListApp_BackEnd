const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.createHash('sha256').update(process.env.AES_SECRET_KEY).digest();
const iv = crypto.randomBytes(16);
const ivUser = iv.toString('hex');

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: ivUser,
        encryptedData: encrypted,
        userPassword: `${encrypted}${ivUser}`
    };
};

const decrypt = (encryptedData, iv) => {
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = { encrypt, decrypt };