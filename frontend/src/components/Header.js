import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isActive, setActive] = useState(false)

  const renderClasses = () => {
    let classes = 'navlinks'
    if(isActive){
      classes += ' active'
    }
    return classes
  }

  const logout = () => {
    localStorage.clear()
  }

  console.log('hello')

  return (
    <nav>
      <ul className={renderClasses()}>
        <li className='link'><Link to='/'>Home</Link></li>
        <li className='link'><Link to='/login'>Login</Link></li>
        <li className='link'><Link to='/sign-up'>Sign Up</Link></li>
        <li className='link'><Link to='/' onClick={logout}>Logout</Link></li>
      </ul>
      <div onClick={() => setActive(!isActive)} className='hamburger-toggle'>
        <i className='fas fa-bars fa-lg'/>
      </div>
    </nav>
  )
}

export default Header