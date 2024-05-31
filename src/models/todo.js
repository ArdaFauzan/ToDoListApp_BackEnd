const dbPool = require('../config/db_todo');

const createNewToDo = async (id, user_id, todo, completed, date) => {
    const SQLQuery = `INSERT INTO todo (id, user_id, todo, completed, date) VALUES (?, ?, ?, ?, ?)`;
    try {
        const result = await dbPool.execute(SQLQuery, [id, user_id, todo, completed, date]);
        return result;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const getAllToDo = async (user_id) => {
    try {
        await dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');

        const rows = await dbPool.execute('SELECT * FROM todo WHERE user_id = ? ORDER BY date DESC', [user_id]);

        await dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');

        return rows;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const updateToDo = async (todo, completed, id) => {
    const SQLQuery = `UPDATE todo SET todo = ?, completed = ? WHERE id = ?`;
    try {
        const result = await dbPool.execute(SQLQuery, [todo, completed, id]);
        return result;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const deleteToDo = async (id) => {
    const SQLQuery = `DELETE FROM todo WHERE id = ?`;
    try {
        const result = await dbPool.execute(SQLQuery, [id]);
        return result;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

module.exports = {
    createNewToDo,
    getAllToDo,
    updateToDo,
    deleteToDo,
}
