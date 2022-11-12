require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL database = ", err);
    return;
  }
  console.log("Connected to mysql server successfully");
});

module.exports = db;
