import { TextField, Button, Radio, FormLabel, FormControlLabel, RadioGroup } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/client/register.css'
import { useState } from 'react';
import Login from './login';

const Register = () => {
    const [state, setRegisterState] = useState({})
    const navigate = useNavigate()
    const submitRegisterForm = async(e)=>{
        e.preventDefault();
        try {
            let data = await fetch('http://localhost:3535/register',{
                "method":"POST",
                "headers":{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(state)
            });
            if(!data.ok) return new Error('Failed to Register')
            let response = await data.json()
        console.log(response)
        navigate(<Login/>)

        } catch (error) {
            console.log(error)        
        }finally{
            setRegisterState({});
            e.target.reset(); 
        }
    }
    const handleChange = (e)=>{
        setRegisterState({...state, [e.target.name]:e.target.value})
    }

    return (
        <div className="register-wrapper">
            <div className="register-box">
                {/* Left Logo */}
                <div className="logo-section">
                    <img src="/Consulto_Logo.png" alt="Consulto Logo" className="logo-image" />
                </div>

                {/* Right Form */}
                <div className="register-container">
                    <form id="registerForm" className="form" onSubmit={submitRegisterForm}>
                        <TextField required label="UserName" type="text" name="username" fullWidth onChange={handleChange} />
                        <TextField required label="Mobile Number" type="tel" name="mobileNumber" fullWidth  onChange={handleChange}/>
                        <TextField required label="Email" type="email" name="email" fullWidth onChange={handleChange} />
                        <TextField label="Password" type="password" name="password" autoComplete="current-password" fullWidth  onChange={handleChange}/>
                        <TextField label="Age" type="number" name="age" InputLabelProps={{ shrink: true }} fullWidth onChange={handleChange}/>

                        <FormLabel className="gender-label">Gender</FormLabel>
                        <RadioGroup row name="gender" onChange={handleChange}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>

                        <Button type="submit" variant="contained" className="form-button">Register Now</Button>
                    </form>

                    <Button variant="contained"  className="form-button secondary-button">
                        <Link to="/login" className="link-style">Already Registered? Login Now</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Register;
