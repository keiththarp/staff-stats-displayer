const mysql = require("mysql");
const inquirer = require("inquirer");

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
        console.log("Have a nice day!");
        console.log(`\n`);
        connection.end();
      }
    })
};

// ***** Function queries to display tables
// Display the DEPARTMENTS table
displayDepartments = () => {
  console.log("*** Departments Table ***");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    // Display the Department Table
    console.log(`ID | Department \n-------------------------------------------`);
    res.forEach(element => {
      console.log(`${element.id}  | ${element.name}`);
    });
    console.log(`\n`);
    anotherTask();
  });
};

// Display the ROLES table
displayRoles = () => {
  console.log("*** Roles Table ***");
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    // Display the Department Table
    console.log(`ID | Title | Salary | Department ID \n-------------------------------------------`);
    res.forEach(element => {
      console.log(` ${element.id} | ${element.title} | ${element.salary} | ${element.department_id}`);
    });
    console.log(`\n`);
    anotherTask();
  });
};

// Display the EMPLOYEES table
// displayEmployees = () => {
//   console.log("*** EMPLOYEES Table ***");
//   connection.query("SELECT * FROM employee", function (err, res) {
//     if (err) throw err;
//     // Display the Department Table
//     console.log(`ID | First Name | Last Name | Role ID | Manager ID \n-------------------------------------------`);
//     res.forEach(element => {
//       console.log(` ${element.id} | ${element.first_name} | ${element.last_name} | ${element.role_id} | ${element.manager_id}`);
//     });
//     console.log(`\n`);
//     anotherTask();
//   });
// };

// Display the EMPLOYEES table
displayEmployees = () => {
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
      console.log(choice);
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
          inquirer.prompt([
            {
              type: "input",
              name: "title",
              message: "Title for new role?",
            },
            {
              type: "input",
              name: "salary",
              message: "Salary for new role?"
            },
            {
              type: "input",
              name: "departmentID",
              message: "Department ID role belongs to?"
            }
          ])
            .then(input => {
              connection.query(
                "INSERT INTO role SET ?",
                {
                  title: input.title,
                  salary: input.salary,
                  department_id: input.departmentID
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
          inquirer.prompt([
            {
              type: "input",
              name: "firstName",
              message: "New employee's first name?",
            },
            {
              type: "input",
              name: "lastName",
              message: "Last name?"
            },
            {
              type: "input",
              name: "roleID",
              message: "Role ID?"
            },
            {
              type: "input",
              name: "managerID",
              message: "Manager ID?",
              default: ''
            }
          ])
            .then(input => {
              if (input.managerID === '') {
                connection.query(
                  "INSERT INTO employee SET ?",
                  {
                    first_name: input.firstName,
                    last_name: input.lastName,
                    role_id: input.roleID
                  },
                  function (err, res) {
                    if (err) throw err;
                    console.log(`-`);
                    console.log(`${input.firstName} ${input.lastName} added to database.`);
                    console.log(`-`);
                    displayEmployees();
                  }
                )
              } else {
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
              }
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


// Starting inquirer function to determine user desires
start = () => {

  inquirer.prompt({
    type: "list",
    name: "CRUD",
    message: "What would you like to do?",
    choices: [
      'Create',
      'View',
      'Update'
    ]
  })
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
        default:
          text = 'You must make a selection.';
          start();
      };

    });

};

// Get the program started with a nice message and a function.
console.log("\nWelcome to Staff Stats!\n");
start();