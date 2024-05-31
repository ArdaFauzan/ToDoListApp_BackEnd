const dbPool = require('../config/db_todo');

const getUserPhoto = async (id) => {
    try {
        await dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');

        const rows = await dbPool.execute('SELECT imageurl FROM user WHERE id = ?', [id]);

        await dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');

        return rows;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const postUserPhoto = async (url, id) => {
    const SQLQuery = `UPDATE user SET imageurl = ? WHERE id = ?`;
    try {
        const result = await dbPool.execute(SQLQuery, [url, id]);
        return result;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const deleteUserPhoto = async (id) => {
    const SQLQuery = `UPDATE user SET imageurl = NULL WHERE id = ?`;
    try {
        const result = await dbPool.execute(SQLQuery, [id]);
        return result;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

module.exports = { getUserPhoto, postUserPhoto, deleteUserPhoto };
