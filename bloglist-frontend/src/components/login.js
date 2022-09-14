import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const Login = (event) => {
    event.preventDefault()
    handleLogin({ username, password })

  }

  return(
    <>
      <h1>Log in to application</h1>
      <form onSubmit={Login}>
        <div>
          username
          <input
            onChange={({ target }) => setUsername(target.value)}
            value={username}
            type="text"
            name="Username"
          />
        </div>
        <div>
          password
          <input
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            type="password"
            name="Password"
          />
        </div>
        <button type="submit">login</button>
      </form>

    </>
  )}


LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}
export default  LoginForm