const mysql = require('mysql2');

// Create the connection to database
const dbPool = mysql.createConnection({
  host: 'yhh.h.filess.io',
  user: 'todolistapp_castleupon',
  database: 'todolistapp_castleupon',
  password: 'cc94e9945e5a87d6c571447657fa94c786137dbb'
});

module.exports = dbPool.promise()