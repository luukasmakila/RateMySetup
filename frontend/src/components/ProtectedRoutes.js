import React from 'react'
import { Outlet, Navigate } from 'react-router'
import { useAuth } from '../hooks'

const ProtectedRoutes = () => {
  const isAuth = useAuth()

  //Outlet component renders the nested private routes if user is authenticated
  return isAuth ? <Outlet/> : <Navigate to='/login' />
}

export default ProtectedRoutes
