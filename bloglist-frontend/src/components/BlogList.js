import {  useSelector } from 'react-redux'

import {Link } from "react-router-dom"
import { Table } from 'react-bootstrap'

const BlogList = ()=> {
 
    const blogs = useSelector(state=> state.Blogs)
    console.log(blogs,"-------------------------");
    return(
  <div>
          <h2>Blogs</h2>
       <Table striped>
       <tbody>
       
          {blogs.map(blog=>
          <tr key={blog.id}>
             <td>
          <Link to={`/blogs/${blog.id}`} >
            {blog.title}
         </Link>

         </td>
         <td>
          {blog.user.username}
         </td>
         </tr>
            )} 

        </tbody>
      </Table>
  </div>
    )

}

export default BlogList