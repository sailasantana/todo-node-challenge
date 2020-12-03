const express = require('express')
const db = require('./knex-instance')

const todoRouter = express.Router()
const bodyParser = express.json()
const TodoService = require('./todo/todo-service')

'todo.id',
'todo.title',
'todo.completed',


todoRouter  
    .route('/todos')
    .get((req,res,next) => {
        TodoService.getTodos(
            db
        )
        .then(todos => {
            res.status(200).json(todos)

        })
        .catch(next);

    })
    .post(bodyParser, (req,res,next) => {

        const {id} = req.body

        const {title} = req.body
        const {completed} = req.body
        

        const newTodo = {title, completed}

        if(!newTodo){
            return res.status(400).send('All fields required')
        }

        TodoService.insertTodo(
            db,
            newTodo
        
        )
        .then(todo => {
            return res.status(201).location(`http://localhost:8000/v1/todos/${res.body.id}`).json(newTodo)
        })
        .catch(next)


    })

    module.exports = todoRouter