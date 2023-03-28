const mysql = require('mysql2');
console.log(process.env.DB_USER);
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
});
// db.on('error', (err) => {
//     console.log(err);
// });

module.exports = { db };
