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

// Query for DEPARTMENT names
const deptOptions = [];
connection.query(`SELECT * FROM department`, (err, res) => {
  if (err) throw err;
  res.forEach(element => {
    deptOptions.push(
      {
        name: element.name,
        id: element.id
      }
    )
  })
});

// Query for EMPLOYEE ROLE UPDATE
const empOptions = [];
connection.query(`SELECT id, role_id, CONCAT (first_name, " ", last_name) AS name FROM employee`, (err, res) => {
  if (err) throw err;
  res.forEach(element => {
    empOptions.push(
      {
        name: element.name,
        id: element.id,
        role_id: element.role_id
      }
    )
  })
});

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
      choices: function () {
        const deptArr = [];
        deptOptions.forEach((dept) => {
          const deptChoices = {
            name: dept.name,
            value: dept.id
          };
          deptArr.push(deptChoices);
        });
        return deptArr;
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
      }
    },
    {
      type: "list",
      name: "managerID",
      message: "Employee manager?",
      choices: function () {
        const managerArr = [{
          name: "No Manager",
          value: null
        }];
        mngrOptions.forEach((manager) => {
          const managerChoices = {
            name: manager.Manager,
            value: manager.id
          };
          managerArr.push(managerChoices);
        });
        return managerArr;
      }
    }
  ],
  updateRole: [
    {
      type: "list",
      name: "empID",
      message: "Select employee to update role.",
      choices: function () {
        const empArr = [];
        empOptions.forEach((emp) => {
          const empChoices = {
            name: emp.name,
            value: emp.id
          };
          empArr.push(empChoices);
        });
        return empArr;
      }
    },
    {
      type: "list",
      name: "roleID",
      message: "Choose new role for employee.",
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
      }
    },
  ]
};

module.exports = mainQuestions;