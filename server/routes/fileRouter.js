const Router = require("express");
const config = require("config")
const dotenv = require('dotenv')
const expressAsyncHandler = require('express-async-handler')
const fileRouter = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const fileController = require('../controllers/fileController')

fileRouter.post('/createdir', authMiddleware, expressAsyncHandler(fileController.createDir))



module.exports = fileRouter