const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: "First blog post",
      author: "zero",
      url: "www.hello.com",
      likes: 5
    },
    {
      title: "Second one is hereeeeeeeeeeeeeeeeeeeeeeeeee",
      author: "Anonymous",
      url: "www.Anonymous.com",
      likes: 9999999
    },
  ]


const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: "www.temp.com" })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}