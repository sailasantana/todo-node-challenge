require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./middleware/error-handler')
const TodoService = require('./todo/todo-service')
const xss = require('xss')
const jsonParser = express.json()
const path = require('path')
const todoRouter = require('./todo-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption, {
  skip: () => NODE_ENV === 'test',
}))
app.use(cors())
app.use(helmet())

app.use(express.static('public'))

app.use('/v1', todoRouter)

const serializeTodo = todo => ({
  id: todo.id,
  title: xss(todo.title),
  completed: todo.completed
})

app
  .route('/v1/todos')
  .get(/* Your code here */)
  .post(/* Your code here */)



app.use(errorHandler)

module.exports = app