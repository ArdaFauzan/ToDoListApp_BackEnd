const dbPool = require('../config/db_todo');

const createNewToDo = (id, body) => {
    const SQLQuery = `INSERT INTO todo (id, todo, completed) VALUES (?, ?, ?)`;
    return dbPool.execute(SQLQuery, [id, body.todo, body.completed]);
}

const getAllToDo = () => {
    const SQLQuery = 'SELECT * FROM todo';
    return dbPool.execute(SQLQuery);
}

const updateToDo = (id, body) => {
    const SQLQuery = `UPDATE todo SET todo = ?, completed = ? WHERE id = ?`;
    return dbPool.execute(SQLQuery, [body.todo, body.completed, id]);
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
