const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
const config = require("config")
const dotenv = require("dotenv")
const path = require("path")
//const corsMiddleware = require('./middleware/cors.middleware')
const authRouter = require("./routes/authRouter")
const userRouter = require("./routes/userRouter")

const app = express()
 app.use(express.json())
 app.use(cookieParser())
 //app.use(corsMiddleware)
 app.use('/api/auth', authRouter)
 app.use('/api/user', userRouter)

 const dirname = path.resolve();

 app.use('/uploads', express.static(path.join(dirname, '/uploads')))

dotenv.config()

const PORT = process.env.PORT
// || config.get("serverPort")
const DATABASE = process.env.DATABASE
// || config.get("dbUrl")

const start = async () => {
  try {
    await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    app.listen(PORT, () => {
      console.log('Server started on port ', PORT)
    })
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirname, 'client', 'build', 'index.html'))
  })
}

start()