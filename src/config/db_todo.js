const mysql = require('mysql2');

// Create the connection to database
const dbPool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'express_mysql',
});

module.exports = dbPool.promise()