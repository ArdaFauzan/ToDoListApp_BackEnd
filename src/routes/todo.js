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
router.post('/createtodo/:name', createNewToDo)

//GET todo
router.get('/gettodo/:name', verifyToken, getAllToDo)

//UPDATE todo
router.put('/updatetodo/:id', verifyToken, updateToDo)

//DELETE todo
router.delete('/deletetodo/:id', verifyToken, deleteToDo)

//Register new user
router.post('/register', registerNewUser)

//Login user
router.post('/login', loginUser)

//GET user name
router.get('/getusername/:email', verifyToken, getUserName)

//POST user photo
router.post('/uploadphoto/:name', verifyToken, uploadPhotoMiddleware.single('image'), uploadPhoto)

//GET user photo
router.get('/getphoto/:name', verifyToken, getUserPhoto)

//DELETE user photo
router.delete('/deletephoto/:name', verifyToken, deleteUserPhoto)

//CHECK name and email user forgot password
router.post('/checknameandemail', checkNameAndEmail)

//UPDATE password
router.put('/createnewpassword/:name/:email', createNewPassword)

module.exports = router