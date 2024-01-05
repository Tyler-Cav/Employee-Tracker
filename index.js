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

function selection(response) {
    if (response.menuSelection === 'view all departments') {
        viewDepartments()
    } else if (response.menuSelection === 'view all roles') {
        viewAllRoles()
    } else if (response.menuSelection === 'view all employees') {
        viewallEmployees()
    } else if (response.menuSelection === 'add a department') {
        console.log('add a department')
        addDepartment()
    } else if (response.menuSelection === 'add a role') {
        addRole()
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

async function viewallEmployees() {
    const employees = await db.query('SELECT role.id, first_name, last_name, title, Department_Name, salary, manager_id FROM role INNER JOIN employee ON employee.id = role.id INNER JOIN department ON department.id = role.department_id')
    console.table(employees)
    mainMenu()
}

async function addDepartment() {
    inquirer
        .prompt([ 
            {
                type: 'input',
                message: 'Please enter the department you would like to add',
                name: 'deptAdd',
            }
        ])
        .then(response => {
            let newDept = JSON.stringify(response.deptAdd);
            db.query(`INSERT INTO department (Department_Name) VALUES(${newDept})`)
            .then(mainMenu())
        })
}

async function addRole() {
    db.query('SELECT Department_Name FROM department')
        .then(result => {
        const choices = result.map(row => row.Department_Name);
    inquirer
        .prompt([ 
            {
                type: 'input',
                message: 'Please enter the title of the role',
                name: 'titleAdd',
            },
            {
                type: 'input',
                message: 'Please enter the yearly salary. Please exclude any currency symbol or commas.',
                name: 'salaryAdd'
            },
            {
                type: 'list',
                message: 'Please select the department',
                choices: choices,
                name: 'deptSelection',
            }
        ])
        .then(response => {
            let newTitle = JSON.stringify(response.titleAdd)
            let newSalary = response.salaryAdd
            let deptChoice = JSON.stringify(response.deptSelection)
            db.query(`INSERT INTO role (title, salary, department_id) VALUES(${newTitle}), ${newSalary}, ${deptChoice}`)
            .then(mainMenu())
        })
})}


// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database