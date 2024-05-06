const express = require('express')
const { createNewToDo, getAllToDo, updateToDo, deleteToDo } = require('../controller/todo')
const { registerNewUser } = require('../controller/register')
const { loginUser, getUserName } = require('../controller/login')
const uploadPhotoMiddleware = require('../middleware/uploadPhoto')
const { uploadPhoto } = require('../controller/photo')
const router = express.Router()

//POST new todo
router.post('/createtodo/:name', createNewToDo)

//GET todo
router.get('/gettodo/:name', getAllToDo)

//UPDATE todo
router.put('/updatetodo/:id', updateToDo)

//DELETE todo
router.delete('/deletetodo/:id', deleteToDo)

//Register new user
router.post('/register', registerNewUser)

//Login user
router.post('/login', loginUser)

//GET user name
router.get('/getusername/:email', getUserName)

//POST user photo
router.post('/uploadphoto', uploadPhotoMiddleware.single('image'), uploadPhoto)

// //GET user photo
// router.get('/getphoto/:name', )

module.exports = router