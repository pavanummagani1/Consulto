import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/client/login.css';
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const [state, setLoginState] = useState({});

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
    try {
      // alert('Hello')
      let response = await fetch('http://localhost:3201/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
      });
      console.log(response)

      if (!response.ok) throw new Error('Login failed');

      let data = await response.json();
      console.log(data)
      const user = {
        userToken: data.token,
        userid:data.userid
      }
      if (data.token && data.status) {
        localStorage.setItem('user', JSON.stringify(user));
        toast.success(data.message || "Login successful!", { position: "top-right" });
        setTimeout(() => navigate('/dashboard'), 5000);
      } else {
        toast.error("Login failed", { position: "top-right" });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Network error. Please try again.", { position: "top-right" });
    } finally {
      setLoginState({});
      e.target.reset();
    }
  }

  const handleChange = (e) => {
    setLoginState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <div className="mainContainer">
      <h1>WELCOME BACK</h1>
      <div className="authWrapper">
        <div className="logo">
          <img src="/Consulto_Logo.png" className="Image" alt="Consulto Logo" />
        </div>
        <div className="loginContainer">
          <form id='loginForm' onSubmit={submitLoginForm}>
            <TextField label="Email/UserName" type='text' name='email' onChange={handleChange} />
            <TextField label="Password" type="password" autoComplete="current-password" name='password' onChange={handleChange} />
            <div id='forgotPassword'><Link to="/forgotpassword">Forgot Password?</Link></div>
            <Button variant="contained" type='submit'>Login Now</Button>
          </form>
          <Button variant="contained" component={Link} to="/register" className='registerBtn'>
            New User? Register Now
          </Button>
          <Button variant="contained" className='registerBtn'>
            <span> <FcGoogle size={24}/></span> Sign Up With Google
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;