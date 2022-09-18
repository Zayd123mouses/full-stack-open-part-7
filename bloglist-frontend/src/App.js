import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import './index.css'
import Login  from './components/login'
import NewBlog  from './components/newBlog'
import Togglable from './components/togglable.js'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/BlogReducer'

import BlogList from './components/BlogList'
import Menu from './components/Menu'
import BlogForm from './components/BlogForm'
import userService from './services/user'
import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate, useNavigate,useMatch
} from "react-router-dom"
import { loginUser, logoutUser } from './reducers/user'
import { initializeUsers } from './reducers/users'
import Users from './components/Users'
import User from './components/User'
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
  
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
useEffect(()=>{
  dispatch(initializeBlogs())
  dispatch(initializeUsers())
},[])


useEffect(()=>{
  
const userFromStorage =  userService.getUser()
if (userFromStorage){
  dispatch(loginUser(userFromStorage))
}
},[])  
 
const logout = ()=>{
  userService.clearUser()
  dispatch(logoutUser())
}
console.log("user ", useSelector(state=>state))
console.log("storage", JSON.parse(window.localStorage.getItem('logged')))
  



if(user === null){
  return(
    <>
    <Login/>
    </>
  )
  
}

  return ( 
    <div className='container'>

        <Menu logout={logout}/>

      
        <Routes>
          <Route path="/create" element={<NewBlog/>}/>
          <Route path="/blogs/:id" element={<Blog />}/>
          <Route path="/" element={ <BlogList /> } />
          <Route path="/login" element={ <Login /> } /> 
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />


      </Routes>
        

      

    </div>

  )
}

export default App
