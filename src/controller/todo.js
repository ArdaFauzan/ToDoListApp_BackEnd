const { nanoid } = require('nanoid')
const toDoModels = require('../models/todo')

const createNewToDo = async (req, res) => {
    const id = nanoid(5)
    const data = req.body

    try {
        await toDoModels.createNewToDo(data, id)
        res.json({
            message: 'Create new todo success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error
        })
    }
}

const getAllToDo = async (req, res) => {
    try {
        const [data] = await toDoModels.getAllToDo()
        res.json({
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
    const { id } = req.params
    const data = req.body

    try {
        await toDoModels.updateToDo(data, id)
        res.json({
            message: 'Update todo success',
            data: data
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
        res.json({
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