import React, { useState } from 'react';
import { TextField, Button, Radio, FormLabel, FormControlLabel, RadioGroup } from '@mui/material';
import '../Styles/login.css';
import LandingPage from './landingPage';

const LoginRegister = () => {
    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(true);
    const [doctorLogin, setDoctorLogin] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        age: 0,
        gender: '',
        mobileNumber: ''
    });

    const showRegister = () => {
        setRegister(true);
        setLogin(false);
        setDoctorLogin(false);
    };

    const showLogin = () => {
        setRegister(false);
        setLogin(true);
        setDoctorLogin(false);
    };

    const toggleDoctorLogin = () => {
        setDoctorLogin(prev => !prev);
        setLogin(prev => prev ? false : true);
        setRegister(false);
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const registerForm = async (e) => {
        e.preventDefault();
        const { username, email, password, age, gender, mobileNumber } = formData;
        const body = { username, email, password, age, gender, mobileNumber };

        console.log(body);
        try {
            const response = await fetch('http://localhost:3143/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (!response.ok) throw new Error('Registration failed');
            console.log(response)
        } catch (err) {
            console.error(err);
        }
    };


    const loginForm = async(e)=>{
        e.preventDefault()
        const { email, password } = formData;
        const body = {email, password };
        console.log(email,password)
        try {
            const response = await fetch('http://localhost:3143/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (response.ok){
                window.location.href=<LandingPage/>
            }else{
                throw new Error('Login failed');
            }
            console.log(response)
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className='LoginPage'>
            <button onClick={toggleDoctorLogin}>
                {doctorLogin ? "User Login" : "Doctor's Login"}
            </button>

            <div className='mainContainer'>
                <div className="imageContainer">
                    <img src="/Consulto_Logo.png" className="Image" alt="Consulto Logo" />
                </div>

                <div className="container">
                    {/* Login Section */}
                    {login && !doctorLogin && (
                        <div className="loginContainer">
                            <form id='loginForm'  onSubmit={loginForm} >
                                <TextField required label="Email/UserName" type='text'name='email' onChange={onChangeInput} />
                                <TextField label="Password" type="password" autoComplete="current-password" name='password' onChange={onChangeInput} />
                                <Button variant="contained" type='submit'>Login Now</Button>
                            </form>
                            <Button variant="contained" onClick={showRegister}>
                                New User? Register Now
                            </Button>
                        </div>
                    )}

                    {/* Register Section */}
                    {register && !doctorLogin && (
                        <div className="Container">
                            <form id='registerForm' onSubmit={registerForm}>
                                <TextField
                                    required label="UserName" type='text' name='username'
                                    onChange={onChangeInput}
                                />
                                <TextField
                                    required label="Mobile Number" type='tel' name='mobileNumber'
                                    onChange={onChangeInput}
                                />
                                <TextField
                                    required label="Email" type='email' name='email'
                                    onChange={onChangeInput}
                                />
                                <TextField
                                    label="Password" type="password" autoComplete="current-password"
                                    name='password' onChange={onChangeInput}
                                />
                                <TextField
                                    label="Age" type="number" name='age'
                                    onChange={onChangeInput}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup
                                    row name="gender"
                                    onChange={onChangeInput}
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                                <Button type='submit' variant="contained">Register Now</Button>
                            </form>
                            <Button variant="contained" onClick={showLogin}>
                                Already Registered? Login Now
                            </Button>
                        </div>
                    )}

                    {/* Doctor Login Section */}
                    {doctorLogin && (
                        <div className="loginContainer">
                        <h2 className='text'>DOCTOR LOGIN</h2>
                            <form id='loginForm'>
                                <TextField required label="Email/UserName" type='text' />
                                <TextField label="Password" type="password" autoComplete="current-password" />
                                <Button variant="contained">Login Now</Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
