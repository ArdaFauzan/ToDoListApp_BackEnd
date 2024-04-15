const mysql = require('mysql2');

// Create the connection to database
const dbPool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'db_todo',
});

module.exports = dbPool.promise()