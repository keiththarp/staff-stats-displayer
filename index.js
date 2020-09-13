// Get the database connection
const connection = require("./database/connection")
// Inquirer for the questions
const inquirer = require("inquirer");
// console.table for the formatting
const cTable = require("console.table");

// Bring in our question objects
const startQuestions = require("./questions/startQuestions");
const {
  role,
  employee,
  updateRole
} = require("./questions/mainQuestions");

// Continue or quit function
anotherTask = () => {
  inquirer.prompt({
    type: "list",
    name: "anotherTask",
    message: "Would you like to continue?",
    choices: [
      'Continue',
      'Quit'
    ]
  })
    .then(choice => {
      if (choice.anotherTask === 'Continue') {
        console.log(`\n`);
        start();
      } else {
        console.log(`\n`);
        console.log(`
          *****************************
          |                           |
          |     Have a nice day!      |
          |                           |
          *****************************`
        );
        console.log(`\n`);
        connection.end();
      }
    })
};

// ***** Function queries to display tables
// Display the DEPARTMENTS table
displayDepartments = () => {
  console.log(`\n`);
  console.log("*** Departments Table ***");
  connection.query("SELECT * FROM department", function (err, res) {
    console.table(res);
    console.log(`\n`);
    anotherTask();
  });
};

// Display the ROLES table
displayRoles = () => {
  console.log(`\n`);
  console.log("*** Roles Table ***");
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    console.log(`\n`);
    anotherTask();
  });
};


// Display the EMPLOYEES table
displayEmployees = () => {
  console.log(`\n`);
  console.log("*** EMPLOYEES Table ***");
  connection.query(`SELECT CONCAT( e.first_name, " ", e.last_name ) AS Employee, title AS Title, salary AS Salary, name AS Department, CONCAT( m.first_name, " ", m.last_name ) AS Manager
  FROM employee e
  LEFT JOIN role ON e.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee m ON m.id = e.manager_id`,
    function (err, res) {
      if (err) throw err;
      // Display the Department Table
      console.table(res);
      console.log(`\n`);
      anotherTask();
    });
};


// Create!! Determine which type of record to create then create it.
createRecord = () => {
  inquirer.prompt({
    type: "list",
    name: "createType",
    message: "What type of record would you like to create?",
    choices: [
      'Department',
      'Role',
      'Employee'
    ]
  })
    .then(choice => {
      const type = choice.createType;
      switch (type) {

        // Creat new DEPARTMENT record
        case 'Department':
          inquirer.prompt({
            type: "input",
            name: "newDepartment",
            message: "Please enter a name for the new department."
          }).then(input => {
            connection.query(
              "INSERT INTO department SET ?",
              {
                name: input.newDepartment
              },
              function (err, res) {
                if (err) throw err;
                console.log(`-`);
                console.log(`${input.newDepartment} added to database.`);
                console.log(`-`);
                displayDepartments();
              }
            )
          });
          break;

        // Create new ROLE record
        case 'Role':
          inquirer.prompt(role)
            .then(input => {
              connection.query(
                "INSERT INTO role SET ?",
                {
                  title: input.title,
                  salary: input.salary,
                  department_id: input.deptID
                },
                function (err, res) {
                  if (err) throw err;
                  console.log(`-`);
                  console.log(`${input.title} added to database.`);
                  console.log(`-`);
                  displayRoles();
                }
              )
            });
          break;

        // Create new EMPLOYEE record
        case 'Employee':
          inquirer.prompt(employee)
            .then(input => {
              connection.query(

                "INSERT INTO employee SET ?",
                {
                  first_name: input.firstName,
                  last_name: input.lastName,
                  role_id: input.roleID,
                  manager_id: input.managerID
                },
                function (err, res) {
                  if (err) throw err;
                  console.log(`-`);
                  console.log(`${input.firstName} ${input.lastName} added to database.`);
                  console.log(`-`);
                  displayEmployees();
                }
              )
            });
          break;

      };
    });
};

viewRecord = () => {
  inquirer.prompt({
    type: "list",
    name: "view",
    message: "Which table would you ike to view?",
    choices: [
      'Employees',
      'Departments',
      'Roles'
    ]
  })
    .then(choice => {
      const view = choice.view
      switch (view) {
        case 'Employees':
          displayEmployees();
          break;
        case 'Departments':
          displayDepartments();
          break;
        case 'Roles':
          displayRoles();
          break;
      };
    });
};

updateRecord = () => {
  inquirer.prompt(updateRole)
    .then(input => {
      connection.query(
        `UPDATE employee SET ? WHERE ?`,
        [
          {
            role_id: input.role_id
          },
          {
            id: input.id
          }
        ],

        function (err, res) {
          if (err) throw err;
          console.log(`-`);
          console.log(`Role changed to in database.`);
          console.log(`-`);
          displayEmployees();
        }
      )
    });
};


// Starting inquirer function to determine user desires
start = () => {
  inquirer.prompt(startQuestions)
    .then(choice => {
      const crud = choice.CRUD;
      switch (crud) {
        case 'Create':
          createRecord();
          break;
        case 'View':
          viewRecord();
          break;
        case 'Update':
          updateRecord();
          break;
      };

    });

};

// Get the program started with a nice message and a function.
console.log(`
        *****************************
        |                           |
        |  Welcome to Staff Stats!  |
        |                           |
        *****************************
`);
start();