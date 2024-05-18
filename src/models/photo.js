const dbPool = require('../config/db_todo');

const getUserPhoto = (id) => {
    const SQLQuery = `  SELECT imageurl FROM user 
                        WHERE id = ?`;
    return dbPool.execute(SQLQuery, [id]);
}

const postUserPhoto = (url, id) => {
    const SQLQuery = `  UPDATE user 
                        SET imageurl = ? 
                        WHERE id = ?`;
    return dbPool.execute(SQLQuery, [url, id]);
};

const deleteUserPhoto = (id) => {
    const SQLQuery = `  UPDATE user
                        SET imageurl = NULL
                        WHERE id = ?`;
    return dbPool.execute(SQLQuery, [id]);
}

module.exports = { getUserPhoto, postUserPhoto, deleteUserPhoto };