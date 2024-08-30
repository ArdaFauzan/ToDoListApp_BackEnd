const dbPool = require('../config/db_todo');

const getUserByEmail = (email) => {
    try {
        dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');

        const rows = dbPool.execute('SELECT * FROM user WHERE email = ?', [email]);

        dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');

        return rows;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const checkUserByEmail = (email) => {
    try {
        dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');

        const rows = dbPool.execute('SELECT COUNT(*) AS count FROM user WHERE email = ?', [email]);

        dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');

        return rows;
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const getIV = async (email) => {
    try {
        dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');

        const rows = await dbPool.execute('SELECT RIGHT(password, 32) AS iv FROM user where email = ?', [email]);

        dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');

        return rows
    } catch (error) {
        console.error('Error executing query', error);
        throw error;
    }
}

const getPassword = async (email) => {
    try {
        await dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED');

        const rows = await dbPool.execute('SELECT SUBSTRING(password, 1, LENGTH(password) - 32) AS password FROM user where email = ?', [email]);

        dbPool.execute('SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ');

        return rows
    } catch (error) {
        console.error('Error fetching password:', error);
        throw error;
    }
};

module.exports = { getUserByEmail, checkUserByEmail, getIV, getPassword };
