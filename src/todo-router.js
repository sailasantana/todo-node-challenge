const express = require('express')
const db = require('./knex-instance')
//const uuid = require('uuid/v4')
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

        

        const {title} = req.body
        const {completed} = req.body
        

        const newTodo = {title, completed}

        for(const field of ['title']){
            if(!req.body[field]){
                return res.status(400).send('All fields required')
            } 
        }
       // if(!newTodo){
           // console.log(newTodo)
           // return res.status(400).send('All fields required')
       // }

        TodoService.insertTodo(
            db,
            newTodo
        
        )
        .then(todo => {
            return res.status(201).location(`/v1/todos/${todo.id}`).json(todo)
        })
        .catch(next)


    })


    todoRouter
        .route('todos/:todo_id')
        .get((req,res,next) => {

            const id = req.params.todo_id

            if(!id){
                return res.status(404).send('ID not found')
            }

            TodoService.getTodoById(
                db, 
                req.params.todo_id
            )
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next);
        })
        .delete((req,res,next) => {

            const id = req.params.todo_id

            if(!id){
                return res.status(404).send('ID not found')
            }

            TodoService.deleteTodo(
                db,
                req.params.todo_id

            )
            .then(todo => {
                res.status(204).end()
            })
            .catch(next);

        })
        .patch(bodyParser, (req,res,next) => {

            const { title } = req.body
            const { completed } = req.body
            const id = req.params.todo_id

            updatedTodo = {title, completed}

            for(const field of ['title', 'completed']){
                if(!req.body[field]){
                    return res.status(400).send(`${field} is required`)
                }
            }

            TodoService.updateTodo(
                db, 
                req.params.todo_id,
                updatedTodo

            )
            .then(todo => {
                return res.status(200).send(updatedTodo)
            })
            .catch(next);
        })

    module.exports = todoRouter