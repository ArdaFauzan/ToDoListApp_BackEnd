const express = require('express')
const { createNewToDo, getAllToDo, updateToDo, deleteToDo } = require('../controller/todo')
const { registerNewUser } = require('../controller/register')
const { loginUser, getUserName } = require('../controller/login')
const uploadPhotoMiddleware = require('../middleware/uploadPhoto')
const { uploadPhoto, getUserPhoto, deleteUserPhoto } = require('../controller/photo')
const { checkNameAndEmail, createNewPassword } = require('../controller/resetPassword')
const verifyToken = require('../middleware/auth')
const router = express.Router()

//POST new todo
router.post('/createtodo/:user_id', verifyToken, createNewToDo)

//GET todo
router.get('/gettodo/:user_id', verifyToken, getAllToDo)

//UPDATE todo
router.put('/updatetodo/:todo_id', verifyToken, updateToDo)

//DELETE todo
router.delete('/deletetodo/:id', verifyToken, deleteToDo)

//Register new user
router.post('/register', registerNewUser)

//Login user
router.post('/login', loginUser)

//POST user photo
router.post('/uploadphoto/:user_id', verifyToken, uploadPhotoMiddleware.single('image'), uploadPhoto)

//GET user photo
router.get('/getphoto/:user_id', verifyToken, getUserPhoto)

//DELETE user photo
router.delete('/deletephoto/:user_id', verifyToken, deleteUserPhoto)

//CHECK name and email user forgot password
router.post('/checknameandemail', checkNameAndEmail)

//UPDATE password
router.put('/createnewpassword/:email', createNewPassword)

module.exports = router