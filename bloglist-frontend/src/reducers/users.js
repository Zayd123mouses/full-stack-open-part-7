import { createSlice } from '@reduxjs/toolkit'
import  userService from '../services/users'

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, {payload}){
      return payload
    }
  }
})

export const {setUsers} = slice.actions

export const initializeUsers = ()=>{
  return async dispatch=>{
    userService.getAll()
    .then(response=> {
      dispatch(setUsers(response))
    }).catch(error=>console.log(error))
  }
}

export default slice.reducer