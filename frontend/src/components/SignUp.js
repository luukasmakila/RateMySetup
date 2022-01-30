import React, { useState } from 'react'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <div className='signup-form'>
        <h2>This is the sign up form</h2>
        <form className='signup__form'>
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
            id='email'
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
