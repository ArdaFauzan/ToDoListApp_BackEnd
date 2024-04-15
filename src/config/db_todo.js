const mysql = require('mysql2');

// Create the connection to database
const dbPool = mysql.createPool({
  host: 'yhh.h.filess.io',
  user: 'todolistapp_castleupon',
  database: 'todolistapp_castleupon',
  password: "cc94e9945e5a87d6c571447657fa94c786137dbb",
  port: '3307'
});

module.exports = dbPool.promise();
