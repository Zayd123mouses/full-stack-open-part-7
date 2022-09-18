import { useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { reactToBlog, removeBlog } from '../reducers/BlogReducer'
const Blog = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const blog = useSelector(state=>state.Blogs.find(blog=>blog.id === id))
  const navigate = useNavigate()

  if (!blog) {
    return null
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const color={
    color: 'red',
  }
 
  const handleLike = async ()=>{
    const liked = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    dispatch(reactToBlog(liked, "liked"))
  }

  const handleDelete = ()=>{
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`)
    if(!ok){
      return
    }
    dispatch(removeBlog(blog.id))
    navigate('/')
  }


    return (
  <div style={blogStyle}>
   
    <h1 className='title'>{blog.title}</h1>

    <div >
    <p>{blog.url}</p>
    <p className='likes'>{blog.likes} <button onClick={handleLike}>Like</button></p>
    <p>Author: {blog.author}</p>
    <button style={color} onClick={handleDelete}>Delete</button>
    </div>
  </div>
)
  
}

export default Blog