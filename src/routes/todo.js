const express = require('express')
const { createNewToDo, getAllToDo, updateToDo, deleteToDo } = require('../controller/todo')
const router = express.Router()

//POST new todo
router.post('/', createNewToDo)

//GET todo
router.get('/', getAllToDo)

//UPDATE todo
router.put('/:id', updateToDo)

//DELETE todo
router.delete('/:id', deleteToDo)

module.exports = router