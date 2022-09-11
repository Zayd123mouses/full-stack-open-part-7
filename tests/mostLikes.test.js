const listHelper = require('../utils/list_helper')


describe('Most Likes ', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const blogs = [
    {
     
      author: "Michael Chan",
      likes: 7,
    },
    {
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
    
      author: "Edsger W. Dijkstra",
      likes: 12,
    },
    {
      
      author: "Robert C. Martin",
      likes: 10,
    },
    {
      
      author: "Robert C. Martin",
      likes: 0,
    },
    {
      
      author: "Robert C. Martin",
      likes: 2,
      
    }  
  ]

    test('when list has more than one blog ', () => {
        const result = listHelper.MostLikes(blogs)
        expect(result).toEqual({
                               author: "Edsger W. Dijkstra",
                               likes: 17
                             })
      })

      test('when list one blog', () => {
        const result = listHelper.MostLikes(listWithOneBlog)
        expect(result).toEqual({
                            author: listWithOneBlog[0].author,
                            blogs: listWithOneBlog[0].likes
                               })
      })

  })