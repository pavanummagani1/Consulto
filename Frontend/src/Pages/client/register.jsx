import { TextField, Button, Radio, FormLabel, FormControlLabel, RadioGroup } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/client/register.css'
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [state, setRegisterState] = useState({})
    const navigate = useNavigate()

    const validateForm = () => {
        const requiredFields = ['name', 'email', 'password', 'gender', 'mobileNumber', 'age'];
        
        for (let field of requiredFields) {
            const value = state[field];
            
            if (
                value === undefined || 
                value === null ||
                (typeof value === 'string' && value.trim() === '') ||
                (field === 'age' && (isNaN(value) || Number(value) <= 0))
            ) {
                return false;
            }
        }
        return true;
    };

    const submitRegisterForm = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Please fill all required fields!", { position: "top-right" });
            return;
        }
        
        try {
            const response = await fetch('https://consulto.onrender.com/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(state)
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                toast.success(data.message || "User registered successfully!", { position: "top-right" });
                setTimeout(() => navigate('/login'), 5000);
            } else {
                toast.error(data.message || "Registration failed", { position: "top-right" });
            }
        } catch (error) {
            toast.error("Network error. Please try again.", { position: "top-right" });
            console.error(error);
        }
    }

    const handleChange = (e) => {
        const value = e.target.name === 'age' 
            ? Number(e.target.value)
            : e.target.value;
            
        setRegisterState({ 
            ...state, 
            [e.target.name]: value 
        });
    }

    return (
        <div className="register-wrapper">
            <div className="register-box">
                <div className="logo-section">
                    <img src="/Consulto_Logo.png" alt="Consulto Logo" className="logo-image" />
                </div>

                <div className="register-container">
                    <form id="registerForm" className="form" onSubmit={submitRegisterForm}>
                        <TextField required label="UserName" type="text" name="name" fullWidth onChange={handleChange} />
                        <TextField required label="Mobile Number" type="tel" name="mobileNumber" fullWidth onChange={handleChange} />
                        <TextField required label="Email" type="email" name="email" fullWidth onChange={handleChange} />
                        <TextField required label="Password" type="password" name="password" autoComplete="current-password" fullWidth onChange={handleChange} />
                        <TextField required label="Age" type="number" name="age" InputProps={{ inputProps: { min: 1 } }} fullWidth onChange={handleChange} />

                        <FormLabel className="gender-label" required>Gender</FormLabel>
                        <RadioGroup row name="gender" onChange={handleChange} required>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>

                        <Button type="submit" variant="contained" className="form-button">Register Now</Button>
                    </form>

                    <Button variant="contained" className="form-button secondary-button">
                        <Link to="/login" className="link-style">Already Registered? Login Now</Link>
                    </Button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;