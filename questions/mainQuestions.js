const {
  roleOptionsQuery,
  managerOptionsQuery,
  deptOptionsQuery,
  employeeOptionsQuery
} = require("../database/queries/queries");

module.exports = {

  startQuestions: {
    type: "list",
    name: "CRUD",
    message: "What would you like to do?",
    choices: [
      'Create',
      'View',
      'Update'
    ]
  },

  // Create new Department Question
  department:
  {
    type: "input",
    name: "newDepartment",
    message: "Please enter a name for the new department."
  },

  // CREATE NEW ROLE QUESTIONS
  role: [
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
      type: "list",
      name: "department_id",
      message: "Department?",
      choices: async function () {
        let departments;
        try {
          departments = await deptOptionsQuery()
        } catch (err) {
          console.log(err);
        }
        return departments;
      }
    }
  ],

  // CREATE NEW EMPLOYEE QUESTIONS
  employee: [
    {
      type: "input",
      name: "first_name",
      message: "New employee's first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "Last name?"
    },
    {
      type: "list",
      name: "role_id",
      message: "Employee role?",
      choices: async function () {
        let roles;
        try {
          roles = await roleOptionsQuery()
        } catch (err) {
          console.log(err);
        };
        return roles;
      }
    },
    {
      type: "list",
      name: "manager_id",
      message: "Employee manager?",
      choices: async function () {
        let managers = [];
        try {
          managers = await managerOptionsQuery()
        } catch {
          console.log(err);
        };
        managers.push({
          name: "No Manager",
          value: null
        });
        return managers
      }
    }
  ],
  updateRole: [
    {
      type: "list",
      name: "id",
      message: "Select employee to update role.",
      choices: async function () {
        let employees;
        try {
          employees = await employeeOptionsQuery();
        } catch {
          console.log(err);
        };
        return employees;
      }
    },
    {
      type: "list",
      name: "role_id",
      message: "Choose new role for employee.",
      choices: async function () {
        let roles;
        try {
          roles = await roleOptionsQuery()
        } catch (err) {
          console.log(err);
        };
        return roles;
      }
    },
  ]
};
