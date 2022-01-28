import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
      <h2>Join the RMS Community</h2>
      <div className='footer__info'>
        <h3>Inspire others and take inspiration from others</h3>
        <h3>Leave a rating on someone elses setup</h3>
      </div>
      <Link to={'/sign-up'}><button className='footer__button'>Sign Up Now!</button></Link>
    </div>
  )
}

export default Footer