const checkUser = (name, email) => {
    const SQLQuery = `  SELECT * FROM user 
                        WHERE name = ? 
                        or email = ?`;
    return dbPool.execute(SQLQuery, [name, email]);
}

const updatePassword = (password, id) => {
    const SQLQuery = `  UPDATE user
                        SET password = ? 
                        WHERE id=?`;
    return dbPool.execute(SQLQuery, [password, id]);
}

module.exports = { checkUser, updatePassword }