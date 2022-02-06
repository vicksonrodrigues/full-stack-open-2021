import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/authReducer'
import loginService from '../services/login'
import { useField } from '../hooks'
import storage from '../utils/storage'
import { useHistory } from 'react-router-dom'
import BlogMenu from './BlogMenu'
import { Box } from '@mui/system'
import { Button, Container,  TextField, Typography } from '@mui/material'

const Login = () => {
  const dispatch= useDispatch()
  const history = useHistory()
  const { reset:resestUsername,...username }= useField('text')
  const { reset:resestPassword,...password }= useField('password')

  const handleReset = () => {
    resestPassword()
    resestUsername()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username:username.value, password:password.value
      })

      handleReset()
      dispatch(loginUser(user))
      dispatch(setNotification(`${user.name} welcome back!`,'success',5))
      storage.saveUser(user)
      history.goBack()
    } catch(exception) {
      dispatch(setNotification('wrong username/password', 'error',5))
    }
  }//login function

  return(
    <div>
      <BlogMenu/>
      <Container maxWidth='sm' sx={{ mt: 6 }}>
        <Typography variant='h3' align='center' >
            SIGN IN
        </Typography>
        <Box component = 'form'  onSubmit={handleLogin}  >
          <Box component='div' >
            <TextField
              required
              fullWidth
              variant='standard'
              id="standard-required"
              label="Username"
              helperText ='Required'
              {...username}
            />
          </Box>
          <Box component='div'>
            <TextField
              required
              fullWidth
              variant='standard'
              id="standard-password-input-required"
              label="Password"
              helperText ='Required'
              {...password}
            />
          </Box>
          <Box component='div'>
            <Button id='login' type='submit' fullWidth variant='contained' size='large'>Login</Button>
            <Button id='reset' type='reset' onClick={handleReset} fullWidth>Reset</Button>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default Login