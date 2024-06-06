const dbPool = require('../config/db_todo');

const checkUser = (email) => {
    try {
        dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');

        const rows = dbPool.execute('SELECT * FROM user WHERE email = ?', [email]);

        dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');

        return rows;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const updatePassword = (password, id) => {
    const SQLQuery = `UPDATE user SET password = ? WHERE id = ?`;
    try {
        const result = dbPool.execute(SQLQuery, [password, id]);
        return result;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

module.exports = { checkUser, updatePassword };
