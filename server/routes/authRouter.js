
const Router = require("express");
const config = require("config")
const dotenv = require('dotenv')
const expressAsyncHandler = require('express-async-handler')
const {check} = require("express-validator")
const authRouter = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const authController = require('../controllers/authController')
const {validationReg, validationLogin} = require('../service/user-service')

const validationRegArray = validationReg()
const validationLoginArray = validationLogin()

authRouter.post('/registration', validationRegArray, expressAsyncHandler(authController.registration))

authRouter.post('/login', validationLoginArray, expressAsyncHandler(authController.login))

authRouter.post('/soclogin', expressAsyncHandler(authController.soclogin))

authRouter.get('/activate/:link', expressAsyncHandler(authController.activate))

authRouter.get('/refresh', expressAsyncHandler(authController.refresh))

authRouter.post('/logout', expressAsyncHandler(authController.logout))

module.exports = authRouter
