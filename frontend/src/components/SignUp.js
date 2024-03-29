import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const BACKEND_BASE_URL = "https://cors-everywhere-me.herokuapp.com/http://ec2-54-84-13-213.compute-1.amazonaws.com:3001"

const SignUp = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (email !== confirmEmail){
      return
    }
    const newUser = {
      email,
      username,
      password
    }

    const result = await axios.post(`${BACKEND_BASE_URL}/api/auth/sign-up`, newUser)
    const token = result.data.token
    const userId = result.data.id
    localStorage.setItem('authToken', token)
    localStorage.setItem('userId', userId)
    navigate('/')
  }

  return (
    <div>
      <div className='signup-form'>
        <h2>Sign Up</h2>
        <form className='signup__form' onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type='email'
            required
            id='email'
            placeholder='Enter your email'
            onChange={(event) => setEmail(event.target.value)}
            tabIndex={1}
          />
          <label>Confirm email</label>
          <input
            type='email'
            required
            id='email2'
            placeholder='Confirm your email'
            onChange={(event) => setConfirmEmail(event.target.value)}
            tabIndex={2}
          />
          <label>Username</label>
          <input
            type='username'
            required
            id='username'
            placeholder='Enter your username'
            onChange={(event) => setUsername(event.target.value)}
            tabIndex={3}
          />
          <label>Password</label>
          <input
            type='password'
            required
            id='password'
            placeholder='Enter your password'
            onChange={(event) => setPassword(event.target.value)}
            tabIndex={4}
          />
          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
