const dbPool = require('../config/db_todo');

const getUserByEmail = async (email) => {
    try {
        await dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');

        const rows = await dbPool.execute('SELECT * FROM user WHERE email = ?', [email]);

        await dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');

        return rows
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

module.exports = { getUserByEmail }