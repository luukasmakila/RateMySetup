import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const BACKEND_BASE_URL = "http://ec2-3-81-145-169.compute-1.amazonaws.com:8888"

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = {
      email,
      password
    }
    
    try {
      const result = await axios.post(`http://localhost:3001/api/auth/login`, user)
      const token = result.data.token
      const userId = result.data.id
      localStorage.setItem('authToken', token)
      localStorage.setItem('userId', userId)
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <div className='login-form'>
        <h2>Login</h2>
        <form className='login__form' onSubmit={handleLogin}>
          <label>Email</label>
          <input 
            type='email'
            required
            id='email'
            placeholder='Enter your email'
            onChange={(event) => setEmail(event.target.value)}
            tabIndex={1}
          />
          <label>Password</label>
          <input
            type='password'
            required
            id='password'
            placeholder='Enter your password'
            onChange={(event) => setPassword(event.target.value)}
            tabIndex={2}
          />
          <button type='submit' className='login-button'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login