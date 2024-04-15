const dbPool = require('../config/db_todo')

const createNewToDo = (body, id) => {
    const SQLQuery = `  INSERT INTO todo 
                        VALUES ('${id}', '${body.todo}', '${body.completed}')`

    return dbPool.execute(SQLQuery)
}

const getAllToDo = () => {
    const SQLQuery = 'SELECT * FROM todo'

    return dbPool.execute(SQLQuery)
}

const updateToDo = (body, id) => {
    const SQLQuery = `  UPDATE todo 
                        SET todo='${body.todo}', completed=${body.completed} 
                        WHERE id='${id}'`

    return dbPool.execute(SQLQuery)
}

const deleteToDo = (id) => {
    const SQLQuery = `  DELETE FROM todo 
                        WHERE id='${id}'`

    return dbPool.execute(SQLQuery)
}

module.exports = {
    createNewToDo,
    getAllToDo,
    updateToDo,
    deleteToDo,
}