import React from 'react'
import { Navigate } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage";

const PrivateRoute = ({Component}) => {

  const isLoggedIn = JSON.parse(secureLocalStorage.getItem("doctor"));
  return isLoggedIn ? <Component /> : <Navigate to="/login" />
}

export default PrivateRoute
