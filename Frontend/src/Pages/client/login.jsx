import { TextField, Button, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/client/login.css';
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";
import { auth, provider, signInWithPopup, signInAnonymously } from '../../firebase';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const navigate = useNavigate();
  const [state, setLoginState] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loadingButton, setLoadingButton] = useState(null); // 'login', 'google', or 'guest'

  const validateForm = () => {
    const requiredFields = ['email', 'password'];

    for (let field of requiredFields) {
      const value = state[field];
      if (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '')
      ) {
        return false;
      }
    }
    return true;
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields!", { position: "top-right" });
      return;
    }
    
    setLoadingButton('login');
    
    try {
      let response = await fetch('https://consulto.onrender.com/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
      });

      if (!response.ok) throw new Error('Login failed');

      let data = await response.json();
      const user = {
        userToken: data.token,
        userid: data.userid
      };

      if (data.token && data.status) {
        localStorage.setItem('user', JSON.stringify(user));
        toast.success(data.message || "Login successful!", { position: "top-right" });
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        toast.error("Login failed", { position: "top-right" });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Network error. Please try again.", { position: "top-right" });
    } finally {
      setLoadingButton(null);
      setLoginState({});
      e.target.reset();
    }
  };

  const handleChange = (e) => {
    setLoginState({ ...state, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoadingButton('google');
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await fetch('https://consulto.onrender.com/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          avatar: user.photoURL,
          uid: user.uid
        })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('user', JSON.stringify({
          userToken: data.token,
          userid: data.userid
        }));
        toast.success(data.message || "Login successful!", { position: "top-right" });
        setTimeout(() => navigate('/dashboard'), 3000);
      } else {
        throw new Error(data.message || 'Google Sign-In failed');
      }

    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error(error.message || "Google Sign-In failed", { position: "top-right" });
    } finally {
      setLoadingButton(null);
    }
  };

  const handleGuestLogin = async () => {
    try {
      setLoadingButton('guest');
      
      // Sign in anonymously with Firebase
      const result = await signInAnonymously(auth);
      const user = result.user;

      // Create guest user data
      const guestUser = {
        uid: user.uid,
        isGuest: true,
        createdAt: new Date().toISOString()
      };

      // Optionally send to your backend
      const res = await fetch('https://consulto.onrender.com/auth/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(guestUser)
      });

      let responseData = {};
      if (res.ok) {
        responseData = await res.json();
      }

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify({
        userToken: responseData.token || 'guest-token',
        userid: responseData.userid || user.uid,
        isGuest: true
      }));

      toast.success("Welcome Guest! Explore the application.", { position: "top-right" });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      console.error("Guest Login Error:", error);
      toast.error(error.message || "Failed to login as guest", { position: "top-right" });
    } finally {
      setLoadingButton(null);
    }
  };

  return (
    <div className="mainContainer">
      {/* <h1>WELCOME BACK</h1> */}
      <div className="authWrapper">
        <div className="logo">
          <img src="/Consulto_Logo.png" className="Image" alt="Consulto Logo" />
        </div>
        <div className="loginContainer">
          <form id='loginForm' onSubmit={submitLoginForm}>
            <TextField
              label="Email/UserName"
              type='text'
              name='email'
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              autoComplete="current-password"
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <div id='forgotPassword'><Link to="/forgotpassword">Forgot Password?</Link></div>
            <Button 
              variant="contained" 
              type='submit' 
              fullWidth
              disabled={loadingButton !== null}
              style={{ marginBottom: '16px' }}
            >
              {loadingButton === 'login' ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login Now"
              )}
            </Button>
          </form>

          <div className="auth-options">
            <div className="button-row">
              <Button
                variant="outlined"
                onClick={handleGuestLogin}
                disabled={loadingButton !== null}
                className="auth-button"
              >
                {loadingButton === 'guest' ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Guest Login"
                )}
              </Button>

              <Button
                variant="contained"
                component={Link}
                to="/register"
                disabled={loadingButton !== null}
                className="auth-button"
              >
                Register Now
              </Button>
            </div>

            <div className="button-row">
              <button 
                className="google-login-btn" 
                onClick={handleGoogleSignUp}
                disabled={loadingButton !== null}
              >
                {loadingButton === 'google' ? (
                  <CircularProgress size={20} color="inherit" style={{ marginRight: '8px' }} />
                ) : (
                  <>
                    <FcGoogle size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                    Sign In with Google
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;