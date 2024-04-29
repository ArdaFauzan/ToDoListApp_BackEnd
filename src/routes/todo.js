const express = require('express')
const { createNewToDo, getAllToDo, updateToDo, deleteToDo } = require('../controller/todo')
const { registerNewUser } = require('../controller/register')
const { loginUser } = require('../controller/login')
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

//Login user
router.post('/login', loginUser)

module.exports = router