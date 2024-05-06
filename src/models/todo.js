const dbPool = require('../config/db_todo');

const createNewToDo = (id, user, todo, completed, date) => {
    const SQLQuery = `INSERT INTO todo (id, user, todo, completed, date) VALUES (?, ?, ?, ?, ?)`;
    return dbPool.execute(SQLQuery, [id, user, todo, completed, date]);
}

const getAllToDo = (name) => {
    const SQLQuery = 'SELECT * FROM todo WHERE user = ?';
    return dbPool.execute(SQLQuery, [name]);
}

const updateToDo = (todo, completed, id) => {
    const SQLQuery = `UPDATE todo SET todo = ?, completed = ? WHERE id = ?`;
    return dbPool.execute(SQLQuery, [todo, completed, id]);
}

const deleteToDo = (id) => {
    const SQLQuery = `DELETE FROM todo WHERE id = ?`;
    return dbPool.execute(SQLQuery, [id]);
}

module.exports = {
    createNewToDo,
    getAllToDo,
    updateToDo,
    deleteToDo,
}
