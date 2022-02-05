import React from 'react'
import { Link } from 'react-router-dom'

const Imgbody = () => {
  return (
    <div className='showcase'>
      <h1>Rate My Setup</h1>
      <p>Find inspiration from other's setups or inspire other's by creating a post of your own!</p>
      <div className='showcase__buttons'>
        <Link to='/posts'><button className='showcase__buttons-posts'>Review other's!</button></Link>
        <Link to='/create-post'><button className='showcase__buttons-create'>Create post!</button></Link>
      </div>
    </div>
  )
}

export default Imgbody
