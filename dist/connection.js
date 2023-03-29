//a basic connection file that sets up the connection to an sql database
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
});

module.exports = { db };
