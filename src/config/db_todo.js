const mysql = require('mysql2');

// Create the connection to database
const dbPool = mysql.createConnection({
  host: 'sql204.infinityfree.com',
  user: 'if0_36366101',
  database: 'if0_36366101_db_todo',
  password: '4aBWMktZ6K9r0VR'
});

module.exports = dbPool.promise()