const dbPool = require('../config/db_todo');

const createNewUser = async (id, name, email, hashedPassword, imageurl) => {
    const SQLQuery = `INSERT INTO user (id, name, email, password) VALUES (?, ?, ?, ?)`;
    try {
        const result = await dbPool.execute(SQLQuery, [id, name, email, hashedPassword]);
        return result;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const checkEmail = async (email) => {
    try {
        await dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');

        const rows = await dbPool.execute('SELECT COUNT(*) AS emailCount FROM user WHERE email = ?', [email]);

        await dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');

        return rows;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

module.exports = { createNewUser, checkEmail };
