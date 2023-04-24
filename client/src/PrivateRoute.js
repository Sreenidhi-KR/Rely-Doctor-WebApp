import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const PrivateRoute = ({Component}) => {

  const isLoggedIn = JSON.parse(localStorage.getItem("doctor"));
  return isLoggedIn ? <Component /> : <Navigate to="/login" />
}

export default PrivateRoute
