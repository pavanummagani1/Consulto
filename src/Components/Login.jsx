import React, { useState } from 'react';
import { TextField, Button, Radio, FormLabel, FormControlLabel, RadioGroup } from '@mui/material';
const LoginRegister = () => {
    const [showRegister, setShowRegister] = useState(false);
    return (
        <>
            <div className='LoginPage'>
                <button>Doctor's Login</button>
                <div className='mainContainer'>
                    <div className="imageContainer">
                        <img src="/Consulto_Logo.png" className="Image" />
                    </div>
                    <div className="container">
                        {/* LOGIN */}
                        {!showRegister && (<div className="loginContainer">
                            <form action="" id='loginForm'>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email/UserName"
                                    type='text'
                                />
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                />
                                <Button variant="contained">Login Now</Button>
                            </form>
                            <Button variant="contained" onClick={() => setShowRegister(true)}>New User? Register Now</Button>
                        </div>)}
                        {/* REGISTER */}
                        {showRegister && (<div className="Container">
                            <form action="" id='registerForm'>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="UserName"
                                    type='text'
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    type='email'
                                />
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                />
                                <TextField
                                    id="outlined-number"
                                    label="Age"
                                    type="number"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                                </RadioGroup>
                                <Button variant="contained">Register Now</Button>
                            </form>
                            <Button variant="contained" onClick={() => setShowRegister(false)}>Already Registered? Login Now</Button>
                        </div>)}
                    </div>
                </div>
            </div>
        </>
    )
}
export default LoginRegister