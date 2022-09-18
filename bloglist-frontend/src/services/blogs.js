import axios from 'axios'
import userService from './user'
const baseUrl = '/api/blogs'

const config = ()=>{
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}` 
    }
  }
}

const getAll = async () => {
  const response = await  axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
 

  const response = await axios.post(baseUrl, newBlog, config())
  return response.data
}


const update = async (id, newBlog) => {
  

  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config())
  return response.data
}

const remove = async (id) => {
 

  const response = await axios.delete(`${baseUrl}/${id}`, config())
  return response
}


export default { getAll, create , update, remove }