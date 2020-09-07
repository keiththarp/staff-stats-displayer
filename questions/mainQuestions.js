const connection = require("../database/connection")
const roleOptions = [];

connection.query("SELECT title FROM role", (err, res) => {
  if (err) throw err;
  res.forEach(element => {
    roleOptions.push(element.title);
  });
})

const mainQuestions = {

  // CRESTE NEW ROLE QUESTIONS
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
      type: "input",
      name: "departmentID",
      message: "Department ID role belongs to?"
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
      choices: roleOptions // Need to assign the appropriate value to this.
    },
    {
      type: "input",
      name: "managerID",
      message: "Manager ID?",
      default: ''
    }
  ]
};

module.exports = mainQuestions;