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

const serializeTodo = todo => ({
  id: todo.id,
  title: xss(todo.title),
  completed: todo.completed
})

app
  .route('/v1/todos')
  .get(/* Your code here */)
  .post(/* Your code here */)

app
  .route('/v1/todos/:todo_id')
  .all((req, res, next) => {
    if(isNaN(parseInt(req.params.todo_id))) {
      return res.status(404).json({
        error: { message: `Invalid id` }
      })
    }
    TodoService.getTodoById(
      req.app.get('db'),
      req.params.todo_id
    )
      .then(todo => {
        if (!todo) {
          return res.status(404).json({
            error: { message: `Todo doesn't exist` }
          })
        }
        res.todo = todo
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeTodo(res.todo))
  })
  .delete((req, res, next) => {
    TodoService.deleteTodo(
      req.app.get('db'),
      req.params.todo_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { title, completed } = req.body
    const todoToUpdate = { title, completed }

    const numberOfValues = Object.values(todoToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must content either 'title' or 'completed'`
        }
      })

    TodoService.updateTodo(
      req.app.get('db'),
      req.params.todo_id,
      todoToUpdate
    )
      .then(updatedTodo => {
        res.status(200).json(serializeTodo(updatedTodo[0]))
      })
      .catch(next)
  })


app.use(errorHandler)

module.exports = app