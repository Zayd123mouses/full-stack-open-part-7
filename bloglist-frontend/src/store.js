import { configureStore } from '@reduxjs/toolkit'
import BlogReducer from './reducers/BlogReducer'
import userReducer  from './reducers/user'
import usersReducer from './reducers/users'
export const store = configureStore({
  reducer: {
    Blogs: BlogReducer,
    user: userReducer,
    users: usersReducer
  },
  
})
