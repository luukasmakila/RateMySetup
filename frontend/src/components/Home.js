import React from 'react'
import Imgbody from './Imgbody'
import Footer from './Footer'
import Logout from './Logout'

const Home = () => {
  return (
    <div>
      <div className='main'>
          <Imgbody/>
      </div>
      <Footer/>
      <Logout/>
    </div>
  )
}

export default Home
