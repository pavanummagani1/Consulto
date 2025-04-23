import { TextField, Button } from '@mui/material';
import '../../Styles/client/login.css';
import { useState } from 'react';

const AdminLogin = () => {
        const [state, setAdminState] = useState({})
        const submitAdminForm = async(e)=>{
            e.preventDefault();
            try {
                let data = await fetch('http://localhost:3535/adminlogin',{
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
                setAdminState({});
                e.target.reset(); 
            }
        }
        const handleChange = (e)=>{
          setAdminState({...state, [e.target.name]:e.target.value})
      }
  return (
    <div className="mainContainer">
        <h1>WELCOME BACK, ADMIN</h1>
      <div className="authWrapper">
        <div className="logo">
          <img src="/Consulto_Logo.png" className="Image" alt="Consulto Logo" />
        </div>
        <div className="loginContainer">
          <form id='loginForm' onSubmit={submitAdminForm}>
            <TextField required label="Email/UserName" type='text' name='adminId' onChange={handleChange} />
            <TextField label="Password" type="password" autoComplete="current-password" name='password' onChange={handleChange} />
            <Button variant="contained" type='submit'>Login Now</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
