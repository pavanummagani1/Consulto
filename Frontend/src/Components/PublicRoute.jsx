import React from 'react'

const PublicRoute = ({children}) => {
  sessionStorage.setItem("referrer", window.location.href.substring(21))
  return children;
}

export default PublicRoute