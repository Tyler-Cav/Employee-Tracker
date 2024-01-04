const db = require('./db/connection')
const inquirer = require('inquirer')
const util = require('util')
db.query = util.promisify(db.query)


// const departments = await dbquery