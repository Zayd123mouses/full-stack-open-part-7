const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const mongoose = require('mongoose')
const blogsRouter = require("./controllers/blog")
const logger = require('./utils/logger')
const middleware = require("./utils/middleware")
const webRouter = require("./controllers/web")


logger.info("conecting to mongo database")

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
app.use("/info" ,webRouter)

app.use('/api/blogs', blogsRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
