import React, { useState } from 'react'

const Header = () => {
  const [active, setActive] = useState(false)
  console.log(active)
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
        <li className='link'><a href='/'>Home</a></li>
        <li className='link'><a href='/login'>Login</a></li>
        <li className='link'><a href='/sign-up'>Sign Up</a></li>
      </ul>
      <div onClick={() => setActive(!active)} className='hamburger-toggle'>
        <i className='fas fa-bars fa-lg'/>
      </div>
    </nav>
  )
}

export default Header