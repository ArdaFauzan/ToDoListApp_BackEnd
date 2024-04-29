const dbPool = require('../config/db_todo');

const getUserByEmail = (email) => {
    const SQLQuery = `SELECT id, email, password FROM user WHERE email = ?`;
    return dbPool.execute(SQLQuery, [email]);
}

module.exports = { getUserByEmail };
