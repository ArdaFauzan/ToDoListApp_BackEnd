const dbPool = require('../config/db_todo');

const createNewUser = (id, name, email, hashedPassword, imageurl) => {
    const SQLQuery = `  INSERT INTO user (id, name, email, password) 
                        VALUES (?, ?, ?, ?)`;
    return dbPool.execute(SQLQuery, [id, name, email, hashedPassword]);
}

const checkEmail = (email) => {
    const SQLQuery = `  SELECT COUNT(*) email FROM user 
                        WHERE email = ?`;
    return dbPool.execute(SQLQuery, [email]);
}

module.exports = { createNewUser, checkEmail };
