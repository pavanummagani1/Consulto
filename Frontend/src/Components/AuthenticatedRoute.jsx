import React from 'react'
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({children}) => {
//   const token = ;
    if(localStorage.getItem('user') || localStorage.getItem('Admin') || localStorage.getItem('Doctor')){
        sessionStorage.setItem("referrer", window.location.href.substring(21))
        return children;
    }
    else{
        return <Navigate to={"/"}/>
    }
}

export default AuthenticatedRoute