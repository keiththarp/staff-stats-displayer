const mysql = require("mysql");

// connection information for the sql database
const connection = mysql.createConnection({
  host: DB_HOST,
  port: 3306,
  user: DB_USER,
  password: DB_PASS,
  database: "staff-stats-d"
});


// connecting to the server and DB
connection.connect(function (err) {
  if (err) throw err;

});

module.exports = connection;