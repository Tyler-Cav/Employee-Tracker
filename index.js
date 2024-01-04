const db = require('./db/connection')
const inquirer = require('inquirer')
const util = require('util')
db.query = util.promisify(db.query)


// const departments = await dbquery

function mainMenu () {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Employee Manager: What would you like to do?',
                choices: ['view all departments', 'view all roles', 'view all employees', 
                'add a department', 'add a role', 'add an employee', 'Update an employee role', 'Quit'],
                name: 'menuSelection',
            }
        ])
        .then(response => {
            if (response.menuSelection === 'Quit') {
                console.log("Thank you, Goodbye")
            } else {
            selection(response)
            }
        })
}

mainMenu()

async function selection(response) {
    if (response.menuSelection === 'view all departments') {
        viewDepartments()
    } else if (response.menuSelection === 'view all roles') {
        viewAllRoles()
    } else if (response.menuSelection === 'view all employees') {
        //TODO NEED TO JOIN ADDITIONAL DATA FROM OTHER TABLES
        db.query('SELECT * FROM employee', function (err, results) {
            console.log(results);
          });
    } else if (response.menuSelection === 'add a department') {
        console.log('add a department')
    } else if (response.menuSelection === 'add a role') {
        console.log('add a role')
    } else if (response.menuSelection === 'add an employee') {
        console.log('add an employee')
    } else if (response.menuSelection === 'Update an employee role') {
        console.log('Update an employee role')
    }
}

async function viewDepartments() {
    const depts = await db.query('SELECT * FROM department;')
    console.table(depts)
    mainMenu()
}

async function viewAllRoles() {
    const roles = await db.query('SELECT title, salary FROM role;')
    console.table(roles)
    mainMenu()
}
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database