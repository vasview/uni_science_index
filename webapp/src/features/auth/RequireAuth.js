import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./authSlice";

import React from 'react'

const RequireAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const location = useLocation()
  return (
    isAuthenticated
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth
