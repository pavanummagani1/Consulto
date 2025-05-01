import React from 'react'
import "../../Styles/client/forgot.css"

export const ForgotPassword = () => {
  return (
    <div className='forgotContainer'>
      <input className="inputField" placeholder="Enter Email or Mobile Number" />
      <span className="infoText">We'll send a verification code to your registered email or mobile number.</span>
      <input className="submitButton" type="button" value="Send OTP to Mail" />
    </div>
  )
}
