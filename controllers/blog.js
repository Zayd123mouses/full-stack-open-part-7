const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const helper = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', { username: 1, name: 1 })

  response.status(200).json(blogs)
})



blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.status(200).json(blog)
  }else{
    response.status(404).end()
  }

})


const extractUser = async (token, SECRET) => {
  const decodedToken = jwt.verify(token, SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user =  await User.findById(decodedToken.id)
  return user
}



blogsRouter.post('/', async (request, response) => {
  const body =  request.body

  const token = helper.getTokenFrom(request)
  const user = await extractUser(token, process.env.SECRET) 
  
  if(!body.url && !body.title){
    return response.status(400).json({ error: 'Missing title and url' })
  }


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user:  user._id
  })


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async(request, response) => {

  const token = helper.getTokenFrom(request)
  const user = await extractUser(token, process.env.SECRET) 

  const blog = await Blog.findById(request.params.id)
 
  if(blog.user.toString() !== user._id.toString()){
    return response.status(401).json({ error: 'You can not delete other user blog' })
  }
  


  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


blogsRouter.put('/:id', async(request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  if(!blog){
    return response.status(404).json({ error: 'Blog not found' })
  }

  const newBlog= {
    title: body.title || blog.title || '',
    author: blog.title,
    url: body.url || blog.url || '',
    likes: body.likes || blog.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.status(200).json(newBlog)
})


module.exports = blogsRouter