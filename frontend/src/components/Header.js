import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [active, setActive] = useState(false)

  const renderClasses = () => {
    let classes = 'navlinks'
    if(active){
      classes += ' active'
    }
    return classes
  }
  return (
    <nav>
      <ul className={renderClasses()}>
        <li className='link'><Link to='/'>Home</Link></li>
        <li className='link'><Link to='/login'>Login</Link></li>
        <li className='link'><Link to='/sign-up'>Sign Up</Link></li>
      </ul>
      <div onClick={() => setActive(!active)} className='hamburger-toggle'>
        <i className='fas fa-bars fa-lg'/>
      </div>
    </nav>
  )
}

export default Header