require('dotenv').config()

const mysql = require('mysql2');

// Create the connection to database
const dbPool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD
});

dbPool.getConnection((err) => {
  if(err){
    throw err
  }
  console.log('Connected to database')
})
module.exports = dbPool.promise();
