import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const  BlogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers:{
        setBlogs(state, {payload}){

            return payload.sort((a,b)=> b.likes - a.likes)
        },
         addNew(state, {payload}){
           return state.concat(payload).sort((a,b)=> b.likes - a.likes)
        },
        updateBlog(state, {payload}){
          return state.map(blog=>blog.id === payload.id ? payload: blog).sort((a,b)=> b.likes - a.likes)
        },
        removeOne(state, {payload}){
          return state.filter(blog=>blog.id !== payload).sort((a,b)=> b.likes - a.likes)
        }
    }
})


export const { setBlogs, addNew, updateBlog, removeOne } = BlogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
     blogService.getAll().then(blogs=>{
       dispatch(setBlogs(blogs))
     })
    }
  }

export const createBlog = (blog)=>{
  return async dispatch=>{
    blogService.create(blog)
    .then(response=>{
      dispatch(addNew(response))
    }).catch(error=>console.log(error))
    
  }
}

export const reactToBlog = (blog)=>{
  return async dispatch=>{
    blogService.update(blog.id, blog)
    .then(response=>{
      dispatch(updateBlog(response))
    }).catch(error=>console.log(error))
  }
}

export const removeBlog = (id)=>{
 return async dispatch =>{
  blogService.remove(id)
  .then(()=>{
    dispatch(removeOne(id))
  }).catch(error=>console.log(error))
 }

}
export default BlogSlice.reducer

