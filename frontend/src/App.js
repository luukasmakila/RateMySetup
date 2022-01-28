import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Imgbody from './components/Imgbody'

const App = () => {
  return (
    <div>
      <Header/>
      <div className='main'>
        <Imgbody/>
      </div>
      {/* Routes here */}
      <Login/>
      <SignUp/>
      <Footer/>
    </div>
  )
}

export default App