require('dotenv').config()

const mysql = require('mysql2');

// Create the connection to database
const dbPool = mysql.createPool({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  database: DATABASE,
  port: DATABASE_PORT,
  password: DATABASE_PASSWORD
});

dbPool.getConnection((err) => {
  if(err){
    throw err
  }
  console.log('Connected to database')
})
module.exports = dbPool.promise();
