const connection = require("../connection.js")

module.exports = {

  // **** Queries used for Inquirer prompts **** 

  // Promise functions for Inquirer list options
  roleOptionsQuery: () => {
    return new Promise((resolve, reject) => {
      // Query for ROLE titles to also set id AS value for inquirer's needs
      connection.query("SELECT id AS value, title AS name FROM role", (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  managerOptionsQuery: () => {
    return new Promise((resolve, reject) => {
      // Query for available managers formatted for Inquirer list options
      connection.query(`SELECT CONCAT (e.first_name, " ", e.last_name) AS name, id AS value FROM employee e where e.role_id = 1`, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  deptOptionsQuery: () => {
    return new Promise((resolve, reject) => {
      // Query for available departments formatted for Inquirer list options
      connection.query(`SELECT name, id AS value FROM department`, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  employeeOptionsQuery: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT CONCAT (first_name, " ", last_name) AS name, id AS value FROM employee`, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },
  // *******************************

  // Queries for display functions

  displayDepartmentsQuery: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM department", (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  displayRolesQuery: () => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM role", (err, res) => {
        if (err) reject(err);
        resolve(res)
      });
    });
  },

  displayEmployeesQuery: () => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT CONCAT( e.first_name, " ", e.last_name ) AS Employee, title AS Title, salary AS Salary, name AS Department, CONCAT( m.first_name, " ", m.last_name ) AS Manager
      FROM employee e
      LEFT JOIN role ON e.role_id = role.id
      LEFT JOIN department ON role.department_id = department.id
      LEFT JOIN employee m ON m.id = e.manager_id`, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  },

  //*********************************

  // Create record Queries

  createRoleQuery: (title, salary, department_id) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO role SET ?",
        {
          title: title,
          salary: salary,
          department_id: department_id
        },
        (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
    });
  },

  createDepartmentQuery: (name) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO department SET ?",
        {
          name
        },
        function (err, res) {
          if (err) reject(err);
          resolve(res);
        });
    });
  },

  createEmployeeQuery: (first_name, last_name, role_id, manager_id) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO employee SET ?",
        {
          first_name: first_name,
          last_name: last_name,
          role_id: role_id,
          manager_id: manager_id
        },
        function (err, res) {
          if (err) reject(err);
          resolve(res);
        });
    });
  },

  //*************************************
  // Update Employee Role Query

  updateRecordQuery: (id, role_id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE employee SET ? WHERE ?`,
        [
          {
            role_id
          },
          {
            id
          }
        ],
        function (err, res) {
          if (err) reject(err);
          resolve(res);
        });
    });
  }
};