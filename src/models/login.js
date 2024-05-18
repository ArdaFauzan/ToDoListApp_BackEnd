const dbPool = require('../config/db_todo');

const getUserByEmail = (email) => {
    const SQLQuery = `  SELECT id, email, password FROM user 
                        WHERE email = ?`;
    return dbPool.execute(SQLQuery, [email]);
}

const getUserNameById = (id) => {
    const SQLQuery = `  SELECT name FROM user 
                        WHERE id = ?`;
    return dbPool.execute(SQLQuery, [id])
}

module.exports = { getUserByEmail, getUserNameById };
