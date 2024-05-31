const dbPool = require('../config/db_todo');

const createNewUser = (id, name, email, hashedPassword, imageurl) => {
    const SQLQuery = `INSERT INTO user (id, name, email, password) VALUES (?, ?, ?, ?)`;
    try {
        const result = dbPool.execute(SQLQuery, [id, name, email, hashedPassword]);
        return result;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const checkEmail = (email) => {
    try {
        dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');

        const rows = dbPool.execute('SELECT COUNT(*) AS emailCount FROM user WHERE email = ?', [email]);

        dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');

        return rows;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

module.exports = { createNewUser, checkEmail };
