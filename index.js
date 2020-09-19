require('dotenv').config()

// Get the database connection
const connection = require("./database/connection")
// Inquirer for the questions
const inquirer = require("inquirer");
// console.table for the formatting
const cTable = require("console.table");

// Bring in our question objects

const {
  startQuestions,
  department,
  role,
  employee,
  updateRole
} = require("./questions/mainQuestions");

// Bring in needed queries object
const {
  displayDepartmentsQuery,
  displayRolesQuery,
  displayEmployeesQuery,
  createRoleQuery,
  createDepartmentQuery,
  createEmployeeQuery,
  updateRecordQuery
} = require("./database/queries/queries");

// Ask user if they'd like to continue or quit
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

// ***** Functions to display tables
// Display the DEPARTMENTS table
async function displayDepartments() {
  try {
    console.log(`\n`);
    console.log("*** Departments Table ***");
    const display = await displayDepartmentsQuery();
    console.table(display);
    console.log(`\n`);
    anotherTask();
  } catch {
    console.log(err);
  }
};

// Display the ROLES table
async function displayRoles() {
  try {
    console.log(`\n`);
    console.log("*** Roles Table ***");
    const display = await displayRolesQuery();
    console.table(display);
    console.log(`\n`);
    anotherTask();
  } catch {
    console.log(err);
  };
};


// Display the EMPLOYEES table
async function displayEmployees() {
  try {
    console.log(`\n`);
    console.log("*** EMPLOYEES Table ***");
    const display = await displayEmployeesQuery();
    console.table(display);
    console.log(`\n`);
    anotherTask();
  } catch {
    console.log(err);
  };
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
          inquirer.prompt(department)
            .then(async function (input) {
              const name = input.newDepartment;
              const newDepartment = await createDepartmentQuery(name);
              console.log(`-`);
              console.log(`${input.newDepartment} added to database.`);
              console.log(`-`);
              displayDepartments();
            });
          break;

        // Create new ROLE record
        case 'Role':
          inquirer.prompt(role)
            .then(async function (input) {
              const { title, salary, department_id } = input;
              const newRole = await createRoleQuery(title, salary, department_id);
              console.log(`-`);
              console.log(`${title} added to database.`);
              console.log(`-`);
              displayRoles();
            });
          break;

        // Create new EMPLOYEE record
        case 'Employee':
          inquirer.prompt(employee)
            .then(async function (input) {
              const { first_name, last_name, role_id, manager_id } = input;
              const newEmployee = await createEmployeeQuery(first_name, last_name, role_id, manager_id);
              console.log(`-`);
              console.log(`${first_name} ${last_name} added to database.`);
              console.log(`-`);
              displayEmployees();
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
    .then(async function (input) {
      console.log(input);
      const { id, role_id } = input;
      const updateRole = await updateRecordQuery(id, role_id);
      console.log(`-`);
      console.log(`Role changed in database.`);
      console.log(`-`);
      displayEmployees();
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