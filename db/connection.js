const mysql = require('mysql2');
require('dotenv').config()

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password:process.env.password ,
      
      database: 'employee_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

  module.exports=db;