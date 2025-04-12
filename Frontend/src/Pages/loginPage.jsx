import React, { Component } from 'react';
import { TextField, Button, Radio, FormLabel, FormControlLabel, RadioGroup } from '@mui/material';
import '../Styles/login.css'
class LoginRegister extends Component {
    state = {
        register: false,
        login: true,
        doctorLogin:false,
        username:'',
        email:'',
        password:'',
        age:0,
        gender:'',
        mobileNumber:''

    }
    showRegister = () => {
        this.setState({ login: false, register: true , doctorLogin:false})
    }
    showLogin = () => {
        this.setState({ register: false, login: true, doctorLogin:false })
    }
    toggleDoctorLogin = () => {
        this.setState((prevState) => ({
            doctorLogin: !prevState.doctorLogin,
            login: prevState.doctorLogin, // if already in doctorLogin, go to login
            register: false
        }));
    };
    onChangeInput = (e)=>{
        this.setState({[e.target.name]:e.target.value})

    }
    registerFrom = async(e)=>{
        e.preventDefault()
        const {username,email,password,age,gender,mobileNumber} = this.state
        // console.log(username,email,password,age,gender)
        let body = {
            username,
            email,
            password,
            age,
            gender,
            mobileNumber
        }
        console.log(body)
        try {
            let response = await fetch('http://localhost:3210/register',{
                'method':'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(body)
            })
            if(!response.ok){
                throw new Error
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { login, register,doctorLogin } = this.state
        return (
            <>
                <div className='LoginPage'>
                    <button onClick={this.toggleDoctorLogin}>{doctorLogin ? "User Login" : "Doctor's Login"}</button>
                    <div className='mainContainer'>
                        <div className="imageContainer">
                            <img src="/Consulto_Logo.png" className="Image" />
                        </div>
                        <div className="container">
                            {/* LOGIN */}
                            {login && !doctorLogin && (<div className="loginContainer">
                                <form id='loginForm' >
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
                                <Button variant="contained" onClick={this.showRegister}>New User? Register Now</Button>
                            </div>)}
                            {/* REGISTER */}
                            {register && !doctorLogin && (<div className="Container">
                                <form action="" id='registerForm' onSubmit={this.registerFrom}>
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="UserName"
                                        type='text'
                                        name='username'
                                        onChange={this.onChangeInput}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Mobile Number"
                                        type='telephone'
                                        name='mobileNumber'
                                        onChange={this.onChangeInput}
                                    />
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="Email"
                                        type='email'
                                        name='email'
                                        onChange={this.onChangeInput}
                                    />
                                    <TextField
                                        id="outlined-password-input"
                                        label="Password"
                                        type="password"
                                        autoComplete="current-password"
                                        name='password'
                                        onChange={this.onChangeInput}
                                    />
                                    <TextField
                                        id="outlined-number"
                                        label="Age"
                                        type="number"
                                        name='age'
                                        onChange={this.onChangeInput}
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
                                        name="gender"
                                        onChange={this.onChangeInput}
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                    <Button type='submit' variant="contained">Register Now</Button>
                                </form>
                                <Button variant="contained" onClick={this.showLogin}>Already Registered? Login Now</Button>
                            </div>)}

                            {/* Doctor's Login */}
                            {doctorLogin && (<div className="loginContainer">
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
                            </div>)}
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
export default LoginRegister