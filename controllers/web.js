const webRouter = require('express').Router()

webRouter.get("/",(request,response)=>{
    return response.json("<h1>Hello world</h1>")
})

module.exports = webRouter