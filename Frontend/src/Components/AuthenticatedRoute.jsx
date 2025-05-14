import React from 'react'
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({children}) => {
  const token = localStorage.getItem('user');
    if(token){
        sessionStorage.setItem("referrer", window.location.href.substring(21))
        return children;
    }
    else{
        return <Navigate to={"/"}/>
    }
}

export default AuthenticatedRoute