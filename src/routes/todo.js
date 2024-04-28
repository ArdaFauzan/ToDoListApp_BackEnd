const express = require('express')
const { createNewToDo, getAllToDo, updateToDo, deleteToDo } = require('../controller/todo')
const { registerNewUser } = require('../controller/register')
const router = express.Router()

//POST new todo
router.post('/createtodo', createNewToDo)

//GET todo
router.get('/gettodo', getAllToDo)

//UPDATE todo
router.put('/updatetodo/:id', updateToDo)

//DELETE todo
router.delete('/deletetodo/:id', deleteToDo)

//Register new user
router.post('/register', registerNewUser)

module.exports = router