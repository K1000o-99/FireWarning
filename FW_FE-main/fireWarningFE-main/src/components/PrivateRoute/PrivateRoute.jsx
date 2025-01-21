import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Outlet, Navigate } from 'react-router-dom'

export const PrivateRoute = () => {
  const { isLoggedIn } = useAuth()

  if (isLoggedIn) {
    return <Outlet />
  } else {
    return <Navigate to='/login' />
  }
}
