
const Router = require("express");
const config = require("config")
const dotenv = require('dotenv')
const expressAsyncHandler = require('express-async-handler')
const userRouter = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const userController = require('../controllers/userController')

userRouter.get('/list', expressAsyncHandler(userController.getUsers))



module.exports = userRouter