import { TextField, Button } from '@mui/material';
import '../../Styles/client/login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const [state, setAdminState] = useState({})
  const submitAdminForm = async (e) => {
    e.preventDefault();
    console.log(state)
    try {
      let data = await fetch('https://consulto.onrender.com/admin/login', {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
      });
      if (!data.ok) return new Error('Failed to Register')
      let response = await data.json()
      console.log(response)
    } catch (error) {
      console.log(error)
    } finally {
      setAdminState({});
      e.target.reset();
    }
  }
  const handleChange = (e) => {
    // console.log("Changing:", e.target.name, e.target.value);
    setAdminState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <div className='admin'>
      <div className="top-buttons">
        <Button variant="outlined" className="top-btn"> <Link className='link' to = "/doctorlogin">Doc Login</Link> </Button>
        <Button variant="outlined" className="top-btn"> <Link className='link' to = "/">Back to User</Link> </Button>
      </div>
      <div className="mainContainer">
        <h1>WELCOME BACK, ADMIN</h1>
        <div className="authWrapper">
          <div className="logo">
            <img src="/Consulto_Logo.png" className="Image" alt="Consulto Logo" />
          </div>
          <div className="loginContainer">
            <form id='loginForm' onSubmit={submitAdminForm}>
              <TextField required label="Email/UserName" type='text' name='adminid' onChange={handleChange} />
              <TextField label="Password" type="password" autoComplete="current-password" name='adminPassword' onChange={handleChange} />
              <Button variant="contained" type='submit'>Login Now</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
