const ask = require('inquirer');
const table = require('console.table');
const {
    showReq,
    addDept,
    addRole,
    addEmployee,
    updateEmployee,
} = require('./sqlReqs.js');
//items for the inquirer prompts
//youll notice that ech prompt has a value, i figured this would make dealing with user selections much more straightforward
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
            // { name: 'update an employee role', value: 7 },
            { name: 'quit', value: 8 },
        ],
    },
];
function questions() {
    ask.prompt(menu)
        .then((answers) => {
            //this is where the values come into play. Also returning instead of breaking in order to keep things concise.
            switch (answers.menu) {
                case 1:
                    return showReq(1);
                case 2:
                    return showReq(2);
                case 3:
                    return showReq(3);
                case 4:
                    return addDept();
                case 5:
                    return addRole();
                case 6:
                    return addEmployee();
                case 7:
                    return updateEmployee();
                case 8:
                    console.log('goodbye!');
                    process.exit(1);
                    break;
                default:
                    console.log('something went wrong');
                    process.exit(1);
                    break;
            }
        })
        //gotta love a little recursion
        .then(() => questions());
}

module.exports = { questions };
