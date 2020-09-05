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


start = () => {
  console.log("\nWelcome to Staff Stats!\n");

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
      console.log(choice);
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

}

start();