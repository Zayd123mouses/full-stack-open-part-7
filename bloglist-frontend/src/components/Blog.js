import { useState } from 'react' 


const Blog = ({blog, handleLike, handleDelete}) => {
  const [visible, setVisible] = useState(false)

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

    const displayStyle = {display:  visible? "" : 'none' }
  
 

    return (
  <div style={blogStyle}>
   
    <h1 className='title'>{blog.title} <button onClick={()=> setVisible(!visible)}>{visible ? 'Hide' : 'Show'} </button></h1>

    <div style={displayStyle}>
    <p>{blog.url}</p>
    <p className='likes'>{blog.likes} <button onClick={()=>handleLike(blog)}>Like</button></p>
    <p>Author: {blog.author}</p>
    <button style={color} onClick={()=>handleDelete(blog)}>Delete</button>
    </div>
  </div>
)
  
}

export default Blog