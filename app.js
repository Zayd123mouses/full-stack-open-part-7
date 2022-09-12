const express = require('express')
require('express-async-errors')
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blog')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const webRouter = require('./controllers/web')
const userRouter = require('./controllers/users')
const loginRouter  = require('./controllers/login')

logger.info('conecting to mongo database')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })


const app = express()
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/info' ,webRouter)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)


app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
