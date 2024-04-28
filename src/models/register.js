const dbPool = require('../config/db_todo')

const createNewUser = (id, name, email, hashedPassword) => {
    const SQLQuery = `  INSERT INTO user 
                        VALUES ('${id}', '${name}', '${email}', '${hashedPassword}')`

    return dbPool.execute(SQLQuery)
}

const checkEmail = (email) => {
    const SQLQuery = `SELECT email FROM user WHERE email = ?`;

    return dbPool.execute(SQLQuery, [email]);
}

module.exports = { createNewUser, checkEmail }