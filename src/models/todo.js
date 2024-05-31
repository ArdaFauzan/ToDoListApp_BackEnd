const dbPool = require('../config/db_todo');

const createNewToDo = (id, user_id, todo, completed, date) => {
    const SQLQuery = `INSERT INTO todo (id, user_id, todo, completed, date) VALUES (?, ?, ?, ?, ?)`;
    try {
        const result = dbPool.execute(SQLQuery, [id, user_id, todo, completed, date]);
        return result;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const getAllToDo = (user_id) => {
    try {
        dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');

        const rows = dbPool.execute('SELECT * FROM todo WHERE user_id = ? ORDER BY date DESC', [user_id]);

        dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');

        return rows;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const updateToDo = (todo, completed, id) => {
    const SQLQuery = `UPDATE todo SET todo = ?, completed = ? WHERE id = ?`;
    try {
        const result = dbPool.execute(SQLQuery, [todo, completed, id]);
        return result;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const deleteToDo = (id) => {
    const SQLQuery = `DELETE FROM todo WHERE id = ?`;
    try {
        const result = dbPool.execute(SQLQuery, [id]);
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
