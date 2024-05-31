const dbPool = require('../config/db_todo');

const checkUser = async (name, email) => {
    try {
        await dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');

        const rows = await dbPool.execute('SELECT * FROM user WHERE name = ? OR email = ?', [name, email]);

        await dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');

        return rows;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const updatePassword = async (password, id) => {
    const SQLQuery = `UPDATE user SET password = ? WHERE id = ?`;
    try {
        const result = await dbPool.execute(SQLQuery, [password, id]);
        return result;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

module.exports = { checkUser, updatePassword };
