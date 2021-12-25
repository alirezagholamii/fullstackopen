import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './LoginForm.scss'


const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = (event) => {
    event.preventDefault()
    login({ username, password })
    setUsername('')
    setPassword('')
  }
  return (
    <form className="login" onSubmit={handleLogin} noValidate autoComplete="off">

      <TextField type="text"
        value={username}
        name="username"
        id="username"
        onChange={({ target }) => setUsername(target.value)} label="Username" />


      <TextField id="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        label="Password"
      />
      <Button color="primary" variant="contained" id="login-button" type="submit">login</Button>

    </form>


  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm