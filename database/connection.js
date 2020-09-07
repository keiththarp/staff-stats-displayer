const mysql = require("mysql");

// connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "<07KT&44kt>",
  database: "staff-stats-d"
});

// connecting to the server and DB
connection.connect(function (err) {
  if (err) throw err;

});

module.exports = connection;