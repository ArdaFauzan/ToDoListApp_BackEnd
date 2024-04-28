const dbPool = require('../config/db_todo')

const createNewUser = (id, body, hashedPassword) => {
    const SQLQuery = `  INSERT INTO user 
                        VALUES ('${id}', '${body.username}', '${body.email}', '${hashedPassword}')`

    return dbPool.execute(SQLQuery)
}

const checkEmail = (email) => {
    const SQLQuery = `SELECT email FROM user
                        WHERE email = '${email}'`

    return dbPool.execute(SQLQuery)
}

module.exports = {createNewUser, checkEmail}