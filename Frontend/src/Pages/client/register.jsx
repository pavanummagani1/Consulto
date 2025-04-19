import { TextField, Button, Radio, FormLabel, FormControlLabel, RadioGroup } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../Styles/client/register.css'

const Register = () => {
    return (
        <div className="register-wrapper">
            <div className="register-box">
                {/* Left Logo */}
                <div className="logo-section">
                    <img src="/Consulto_Logo.png" alt="Consulto Logo" className="logo-image" />
                </div>

                {/* Right Form */}
                <div className="register-container">
                    <form id="registerForm" className="form">
                        <TextField required label="UserName" type="text" name="username" fullWidth />
                        <TextField required label="Mobile Number" type="tel" name="mobileNumber" fullWidth />
                        <TextField required label="Email" type="email" name="email" fullWidth />
                        <TextField label="Password" type="password" name="password" autoComplete="current-password" fullWidth />
                        <TextField label="Age" type="number" name="age" InputLabelProps={{ shrink: true }} fullWidth />

                        <FormLabel className="gender-label">Gender</FormLabel>
                        <RadioGroup row name="gender">
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
