const connection = require("../database/connection")


// Query for ROLE titles
const roleOptions = [];

connection.query("SELECT id, title FROM role", (err, res) => {
  if (err) throw err;
  res.forEach(element => {
    roleOptions.push(
      {
        title: element.title,
        id: element.id
      });
  });
});

// Query for MANAGEMENT titles
const mngrOptions = [];
connection.query(`SELECT CONCAT (e.first_name, " ", e.last_name) AS Manager, id FROM employee e where e.role_id = 3`, (err, res) => {
  if (err) throw err;
  res.forEach(element => {
    mngrOptions.push(
      {
        Manager: element.Manager,
        id: element.id
      }
    )
  })
});
console.log(mngrOptions);

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
      choices: function () {
        const roleArr = [];
        roleOptions.forEach((role) => {
          const roleChoices = {
            name: role.title,
            value: role.id
          };
          roleArr.push(roleChoices);
        });
        return roleArr;
      },
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