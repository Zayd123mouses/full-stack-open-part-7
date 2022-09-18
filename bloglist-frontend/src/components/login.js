import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import loginService from '../services/login'
import { loginUser } from '../reducers/user'
import userService from '../services/user'
import { Table, Form, Button } from 'react-bootstrap'

const Login= () => {

  const username = useField("text")
  const password = useField("password")
  const dispatch = useDispatch()

  const Login = (event) => {
    event.preventDefault()
    loginService.login({username:username.value, password:password.value})
    .then(response=> {
     
      userService.setUser(response)
      dispatch(loginUser(response))

    }).catch(error=>console.log(error))
  }



  return(
    <>
      <h1>Log in to application</h1>
      <Form onSubmit={Login}>
        <div>
          <Form.Label >username</Form.Label>
          <Form.Control
           {...username}
          />
        </div>
        <div>
        <Form.Label >Password</Form.Label>
          <Form.Control
           {...password}
          />
        </div>
        <Button variant="primary" type="submit" >
          login
        </Button>
      </Form>

    </>
  )}


// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
// }
export default  Login