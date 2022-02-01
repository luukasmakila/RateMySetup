import React from 'react'

const Logout = () => {

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
