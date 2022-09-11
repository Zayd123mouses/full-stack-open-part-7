const listHelper = require('../utils/list_helper')


describe('favorite Blog ', () => {

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
         
          title: "React patterns",
          likes: 7,
        
        },
        {
          title: "Go To Statement Considered Harmful",
          likes: 5,
        },
        {
          title: "Canonical string reduction",
          likes: 12,
        },
        {
          title: "First class tests",
          
          likes: 10,
        },
        {
          
          title: "TDD harms architecture",
          likes: 0,
        },
        {
          title: "Type wars",
          likes: 20,
        }  
      ]
    test('when list has more than one blog its faviorate', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[5])
      })

      test('when list one blog  its faviorate', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
      })

  })