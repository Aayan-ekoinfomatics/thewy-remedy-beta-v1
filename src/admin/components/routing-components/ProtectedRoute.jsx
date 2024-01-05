import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  return localStorage.getItem("status" ) === 'true' ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute