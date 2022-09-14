import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import LoginForm  from './components/login'
import NewBlog  from './components/newBlog'
import Togglable from './components/togglable.js'



const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }

  return (
    <div className= {error ?  'error' : 'sucess' } >
      { message }
    </div>
  )
}



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, Setnotification] = useState(null)
  const [Error, setError] = useState(false)



  useEffect(() => {
    blogService.getAll().then(blogs => {


      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('logged')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async (credits) => {
    try{
      const user = await loginService.login(credits)
      window.localStorage.setItem(
        'logged', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      handleNotification(`Wrong password or username (${exception})`, true)
      console.log(exception)
    }
  }


  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }



  const blogFormRef = useRef()

  const handleNewBlog =  (newBlog) => {
    blogFormRef.current.toggleVisibility()



    blogService.create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        console.log(blogs)
        handleNotification(`New blog (${returnedBlog.title}) Has been added`, false)
      }).catch(error => {
        handleNotification(`something went wwrong (${error})`, true)
      })
  }



  const handleNotification = (message, error) => {
    Setnotification(message)
    setError(error)

    setTimeout(() => {
      Setnotification(null)
    }, 3000)
  }

  const handleLike = (blogToUpdate) => {
    const newBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    setBlogs(blogs.map(blog => blog.id === newBlog.id ? newBlog : blog).sort((a,b) => b.likes-a.likes))
    blogService.update(blogToUpdate.id, newBlog)
      .then(returnedBlog => {
        console.log(returnedBlog)
      }).catch(error => console.log(error))

  }

  const handleDelete = (blogToDelete) => {
    if(window.confirm(`Are you sure you want to delete ${blogToDelete.title}`)){
      blogService
        .remove(blogToDelete.id)
        .then(() =>
          setBlogs(blogs.filter( blog => blog.id !== blogToDelete.id))

        ).catch(error => {
          handleNotification(`something went wwrong (${error})`, true)
          console.log(error)})
    }

  }

  return (
    <div>
      <Notification message={notification} error={Error}/>

      {user === null ?
        <Togglable buttonLabel="Login">
          <LoginForm
            handleLogin={handleLogin}
          />
        </Togglable>
        :
        <>
          <h1>{user.username} Is logged in <button onClick={logout}>Log out</button></h1>
          <hr/>
          <h2>Blogs</h2>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <NewBlog createBlog={handleNewBlog}/>
          </Togglable>

          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>
            )
          }
        </>

      }

    </div>

  )
}

export default App
