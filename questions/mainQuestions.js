const { roleOptionsQuery, managerOptionsQuery, deptOptionsQuery, employeeOptionsQuery } = require("../database/queries/queries");

const mainQuestions = {


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
      name: "deptID",
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
      name: "firstName",
      message: "New employee's first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "Last name?"
    },
    {
      type: "list",
      name: "roleID",
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
      name: "managerID",
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
      name: "empID",
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
      name: "roleID",
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

module.exports = mainQuestions;