const dbPool = require('../config/db_todo');

const createNewToDo = (id, user_id, todo, completed, date) => {
    const SQLQuery = `INSERT INTO todo (id, user_id, todo, completed, date) VALUES (?, ?, ?, ?, ?)`;
    return dbPool.execute(SQLQuery, [id, user_id, todo, completed, date]);
}

const getAllToDo = (user_id) => {
    const SQLQuery = 'SELECT * FROM todo WHERE user_id = ?';
    return dbPool.execute(SQLQuery, [user_id]);
}

const updateToDo = (todo, completed, id) => {
    const SQLQuery = `UPDATE todo SET todo = ?, completed = ? WHERE id = ?`;
    return dbPool.execute(SQLQuery, [todo, completed, id]);
}

const deleteToDo = (id) => {
    const SQLQuery = `DELETE FROM todo WHERE id = ?`;
    return dbPool.execute(SQLQuery, [id]);
}

const getIdUser = (name) => {
    const SQLQuery = `SELECT id from user WHERE name = ?`
    return dbPool.execute(SQLQuery, [name])
}

module.exports = {
    createNewToDo,
    getAllToDo,
    updateToDo,
    deleteToDo,
    getIdUser
}
