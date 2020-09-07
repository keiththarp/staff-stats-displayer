SELECT CONCAT( e.first_name, " ", e.last_name ) AS Employee, title AS Title, salary AS Salary, name AS Department, CONCAT( m.first_name, " ", m.last_name ) AS Manager

FROM employee e
LEFT JOIN role ON e.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee m ON m.id = e.manager_id

