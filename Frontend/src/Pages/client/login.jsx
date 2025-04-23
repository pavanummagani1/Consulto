import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../Styles/client/login.css';
import { useState } from 'react';

const Login = () => {
      const [state, setLoginState] = useState({})
      const submitLoginForm = async(e)=>{
          e.preventDefault();
          try {
              let data = await fetch('http://localhost:3535/login',{
                  "method":"POST",
                  "headers":{
                      "Content-Type":"application/json"
                  },
                  body:JSON.stringify(state)
              });
              if(!data.ok) return new Error('Failed to Register')
              let response = await data.json()
          console.log(response)
          } catch (error) {
              console.log(error)        
          }finally{
              setLoginState({});
              e.target.reset(); 
          }
      }
      const handleChange = (e)=>{
        setLoginState({...state, [e.target.name]:e.target.value})
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
            <TextField required label="Email/UserName" type='text' name='email' onChange={handleChange} />
            <TextField label="Password" type="password" autoComplete="current-password" name='password' onChange={handleChange} />
            <Button variant="contained" type='submit'>Login Now</Button>
          </form>
          <Button variant="contained">
            <Link to='/register'>New User? Register Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
