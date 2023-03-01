//js functionality for the employee manager
const ask = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
});

// `Select employee.id, employee.first_name, employee.last_name, department.dept_name, roles.title, roles.salary
// FROM employee inner join roles on employee.role_id = roles.id
// inner join department on roles.dept_id=department.id`,
async function showReq(i) {
    const sql = [
        'select * from department',
        'select * from roles',
        `Select employee.id, employee.first_name, employee.last_name, department.dept_name , roles.title, roles.salary, concat(m_employee.first_name,' ', m_employee.last_name) as manager
        FROM employee employee
        left join employee m_employee on employee.manager_id=m_employee.id 
        inner join roles on employee.role_id = roles.id
        inner join department on roles.dept_id=department.id`,
    ];
    db.promise()
        .query(sql[i - 1])
        .then((rows) => {
            console.table(rows[0]);
        })
        .then(() => {
            questions();
        });
}
async function addDept() {
    var newDept = await ask.prompt([
        {
            type: 'input',
            name: 'dept_name',
            message: 'Whats the name of the new Department?',
        },
    ]);
    db.promise()
        .query(
            `INSERT INTO department(dept_name) VALUES("${newDept.dept_name}")`
        )
        .then(() => {
            questions();
        });
}
async function addRole() {
    var sql_dept = await db
        .promise()
        .query({ sql: 'SELECT * from department', rowsAsArray: true });
    var departments = sql_dept[0].map((value) => ({
        name: value[1],
        value: value[0],
    }));
    // console.log(departments);
    var newRole = await ask
        .prompt([
            {
                type: 'input',
                name: 'role_name',
                message: 'What is the name of the role?',
            },
            {
                type: 'input',
                name: 'role_salary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'list',
                name: 'role_dept',
                message: 'What department is the role a part of?',
                choices: departments,
            },
        ])
        .then((answers) => {
            db.promise().query(
                `INSERT INTO roles(title, salary, dept_id) VALUES("${answers.role_name}",${answers.role_salary}, ${answers.role_dept})`
            );
        })
        .then(() => questions());
}

async function addEmployee() {
    const sql_roles = await db
        .promise()
        .query({ sql: 'SELECT * FROM roles', rowsAsArray: true });
    // console.log(sql_roles);
    var roles = sql_roles[0].map((values) => ({
        name: values[1],
        value: values[0],
    }));
    // console.log(roles);
    const sql_managers = await db.promise().query({
        sql: `SELECT CONCAT(employee.first_name ,' ', employee.last_name) AS manager, employee.id as ID FROM employee WHERE employee.manager_id IS NULL`,
        rowsAsArray: true,
    });
    var managers = sql_managers[0].map((values) => ({
        name: values[0],
        value: values[1],
    }));
    managers.push({ name: 'none', value: null });
    // console.log(managers);

    const newEmployee = await ask
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'enter your employees first name:',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'enter your employees last name:',
            },
            {
                type: 'list',
                name: 'role',
                message: 'select your employees role:',
                choices: roles,
            },
            {
                type: 'list',
                name: 'manager',
                message: 'select your employees manager (if they have one)',
                choices: managers,
            },
        ])
        .then((answers) => {
            db.promise().query(
                `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("${answers.first_name}", "${answers.last_name}", ${answers.role}, ${answers.manager})`
            );
        })
        .then(() => questions());
}
async function updateEmployee() {
    const sql_employee = await db.promise().query({
        sql: `SELECT CONCAT(employee.first_name,' ',employee.last_name) as name, employee.id from employee`,
        rowsAsArray: true,
    });
    const employee = sql_employee[0].map((values) => ({
        name: values[0],
        value: values[1],
    }));
    // console.log(employee);
    const sql_roles = await db.promise().query({
        sql: `SELECT roles.title, roles.id FROM roles`,
        rowsAsArray: true,
    });
    const roles = sql_roles[0].map((values) => ({
        name: values[0],
        value: values[1],
    }));
    // console.log(roles);
    ask.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'which employee would you like to update?',
            choices: employee,
        },
        {
            type: 'list',
            name: 'new_role',
            message: 'what is this employees new role?',
            choices: roles,
        },
    ])
        .then((answers) => {
            // console.log(answers);
            db.promise().query(
                `UPDATE employee SET role_id=${answers.new_role} WHERE employee.id=${answers.employee}`
            );
        })
        .then(() => questions());
}

const menu = [
    {
        type: 'list',
        name: 'menu',
        message: 'what would you like to do?',
        choices: [
            { name: 'view all departments', value: 1 },
            { name: 'view all roles', value: 2 },
            { name: 'view all employees', value: 3 },
            { name: 'add a department', value: 4 },
            { name: 'add a role', value: 5 },
            { name: 'add an employee', value: 6 },
            { name: 'update an employee role', value: 7 },
            { name: 'quit', value: 8 },
        ],
    },
];
function questions() {
    ask.prompt(menu).then((answers) => {
        switch (answers.menu) {
            case 1:
                showReq(1);
                break;
            case 2:
                showReq(2);
                break;
            case 3:
                showReq(3);
                break;
            case 4:
                addDept();
                break;
            case 5:
                addRole();
                break;
            case 6:
                addEmployee();
                break;
            case 7:
                updateEmployee();
                break;
            case 8:
                console.log('goodbye!');
                process.exit(1);
                break;
            default:
                console.log('something went wrong');
                process.exit(1);
        }
    });
}
questions();
