const connection = require("../connection.js")

module.exports = {

  // Promise functions for Inquirer list options
  roleOptionsQuery: roleOptionsQuery = () => {
    return new Promise((resolve, reject) => {
      // Query for ROLE titles to also set id AS value for inquirer's needs
      connection.query("SELECT id AS value, title AS name FROM role", (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  managerOptionsQuery: managerOptionsQuery = () => {
    return new Promise((resolve, reject) => {
      // Query for available managers formatted for Inquirer list options
      connection.query(`SELECT CONCAT (e.first_name, " ", e.last_name) AS name, id AS value FROM employee e where e.role_id = 3`, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  deptOptionsQuery: deptOptionsQuery = () => {
    return new Promise((resolve, reject) => {
      // Query for available departments formatted for Inquirer list options
      connection.query(`SELECT name, id AS value FROM department`, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  employeeOptionsQuery: employeeOptionsQuery = () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT CONCAT (first_name, " ", last_name) AS name, id AS value FROM employee`, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

}