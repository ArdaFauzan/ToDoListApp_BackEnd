const express = require('express')
const { createNewToDo, getAllToDo, updateToDo, deleteToDo } = require('../controller/todo')
const { registerNewUser } = require('../controller/register')
const { loginUser, getUserName } = require('../controller/login')
const uploadPhotoMiddleware = require('../middleware/uploadPhoto')
const { uploadPhoto, getUserPhoto, deleteUserPhoto } = require('../controller/photo')
const { checkNameAndEmail, createNewPassword } = require('../controller/resetPassword')
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
router.post('/uploadphoto/:name', uploadPhotoMiddleware.single('image'), uploadPhoto)

//GET user photo
router.get('/getphoto/:name', getUserPhoto)

//DELETE user photo
router.delete('/deletephoto/:name', deleteUserPhoto)

//CHECK name and email user
router.post('/checknameandemail', checkNameAndEmail)

//UPDATE password
router.put('/createnewpassword/:name/:email', createNewPassword)

module.exports = router