require('dotenv').config()

const mysql = require('mysql2');

// Create the connection to database
const dbPool = mysql.createPool(process.env.DATABASE_URL);

module.exports = dbPool.promise();
