import { useState } from "react";
import { TextField, IconButton, InputAdornment,Button,Box,} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Styles/client/forgot.css";
import {useNavigate} from 'react-router-dom'

export const ResetPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleOtpChange = (e) => /^\d{0,6}$/.test(e.target.value) && setOtp(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3201/forgotpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Server responded with an error.");
      toast.success(`OTP has been sent to: ${email}`);
      setOtpSent(true);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleOtpSubmit = async () => {
    if (otp.length !== 6) {
      toast.warning("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      // Simulate success:
      toast.success("OTP verified successfully!");
      setIsOtpVerified(true);
    } catch (err) {
      toast.error("Invalid OTP. Please try again.");
    }
  };

const handlePasswordReset = async () => {
  if (!newPassword || !confirmPassword) {
    toast.error("Both password fields are required.");
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3201/updatepassword", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword })
    });

    if (!response.ok) {
      throw new Error("Failed to reset password.");
    }

    const data = await response.json();
    console.log(data);

    toast.success("Password reset successfully!");
    setTimeout(()=>{
      navigate('/login')
    },5000)
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong. Please try again.");
  }
};


  return (
    <div className="forgot">
      <ToastContainer position="top-right" autoClose={3000} />

      {!otpSent ? (
        <div className="otpRequestContainer">
          <div className="innerBox">
            <input
              type="email"
              className="inputField"
              placeholder="Enter Registered Mail Address"
              value={email}
              onChange={handleEmailChange}
            />
            <span className="infoText">
              We'll send a verification code to your registered email or mobile number.
            </span>
            <input
              className="submitButton"
              type="button"
              value="Send OTP to Mail"
              onClick={handleEmailSubmit}
            />
          </div>
        </div>
      ) : !isOtpVerified ? (
        <div className="otpValidationContainer">
          <input
            className="otpInput"
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={handleOtpChange}
            maxLength={6}
          />
          <input
            className="submitButton"
            type="button"
            value="Verify OTP"
            onClick={handleOtpSubmit}
          />
        </div>
      ) : (
        <Box
          className="passwordResetContainer"
          display="flex"
          flexDirection="column"
          gap={2}
          maxWidth={400}
          margin="0 auto"
        >
          <TextField
            label="New Password"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={handleNewPasswordChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button variant="contained" color="primary" onClick={handlePasswordReset}>
            Reset Password
          </Button>
        </Box>
      )}
    </div>
  );
};
