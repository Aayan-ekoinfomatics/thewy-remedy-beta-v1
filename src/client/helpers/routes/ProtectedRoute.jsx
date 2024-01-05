import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  return localStorage.getItem("token") || localStorage.getItem('user_type') ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute