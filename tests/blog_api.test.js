const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper.js')
const api = supertest(app)
const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
},100000)


describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogss are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
      "First blog post"
    )
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  
test(' id checking', async () => {
  const blogs = await api.get("/api/blogs")
 const  blog = blogs.body[0]
  expect(blog.id).toBeDefined();

})

})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: "add post here",
      author: "added",
      url: "www.tests.com",
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'add post here'
    )
  })

  test('fails with status code 400 if data invalid', async () => {
    const newBlog = {
      author: 'zero'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('Adding a new post with nolikes , expect likes = 0', async () => {

    const newBlog = {
      title: "3RD POST IS FIREEEEEEEEE",
      author: "NONE",
      url: "www.NOEN.com"
    }
    
    const addBlog = await api.post("/api/blogs") 
    .send(newBlog)
  
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  
    expect(addBlog.body.likes).toEqual(0)
  
  })
  
})


describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogssAtEnd = await helper.blogsInDb()

    expect(blogssAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogssAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})


describe('Updating a blog', () => {

  test("update one point", async ()=>{
    const blogsAtStart = await helper.blogsInDb()

    const blogToupdate = blogsAtStart[0]

    const resultblog = await api
    .put(`/api/blogs/${blogToupdate.id}`)
    .expect(200)

      console.log("blogToView , ", blogToupdate)

      const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        const titles = blogsAtEnd.map(r=> r.title)
        expect(titles).toContain(
          blogToupdate.title
         )   
      })

   })

afterAll(() => {
  mongoose.connection.close()
})