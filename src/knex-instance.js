const knex = require('knex')
const {DB_URL} = require('./config')
const app = require('./app')

const db = knex({
  client: 'pg',
  connection: DB_URL
})

//app.set('db', db)

module.exports = db