const toDoModels = require('../models/todo')

const createNewToDo = async (req, res) => {
    const id = nanoid(5)
    const { todo, completed } = req.body
    const { user_id } = req.params
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
        await toDoModels.createNewToDo(id, user_id, todo, completed, date)
        res.status(201).json({
            message: 'Create new todo success',
            data: {
                todo: todo,
                completed: completed,
                date: date
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const getAllToDo = async (req, res) => {
    const { user_id } = req.params

    try {
        const [data] = await toDoModels.getAllToDo(user_id)
        res.status(200).json({
            message: 'Get all todo success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const updateToDo = async (req, res) => {
    const { todo_id } = req.params
    const { todo, completed } = req.body

    try {
        await toDoModels.updateToDo(todo, completed, todo_id)
        res.status(200).json({
            message: 'Update todo success',
            data: {
                todo: todo,
                completed: completed
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const deleteToDo = async (req, res) => {
    const { id } = req.params

    try {
        await toDoModels.deleteToDo(id)
        res.status(200).json({
            message: 'Delete todo success',
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

module.exports = {
    createNewToDo,
    getAllToDo,
    updateToDo,
    deleteToDo,
}