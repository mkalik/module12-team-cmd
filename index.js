//wanted to keep things rather uncluttered so this file strictly handles starting the app
//seems a little pointless but I wanted to practice modularizing things
require('dotenv').config();
let { header } = require('./lib/header.js');
const { questions } = require('./dist/menuQuestions.js');
function init() {
    console.log(header);
    questions();
}
init();
