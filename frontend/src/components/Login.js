import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    navigate('/')
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
