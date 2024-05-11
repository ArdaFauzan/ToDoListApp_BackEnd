const dbPool = require('../config/db_todo');

const getUserPhoto = (name) => {
    const SQLQuery = `  SELECT imageurl FROM user 
                        WHERE name = ?`;
    return dbPool.execute(SQLQuery, [name]);
}

const postUserPhoto = (url, name) => {
    const SQLQuery = `  UPDATE user 
                        SET imageurl = ? 
                        WHERE name = ?`;
    return dbPool.execute(SQLQuery, [url, name]);
};

module.exports = { getUserPhoto, postUserPhoto };