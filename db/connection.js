const mysql = require("mysql2");


// Connect to database
const db = mysql.createConnection({
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "rootroot",
    database: "employee_tracker",
});

db.on("error", (err) => {
    console.log("- STATS Mysql2 connection died:", err);
});

module.exports = db;