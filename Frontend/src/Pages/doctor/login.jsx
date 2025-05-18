import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../../Styles/client/login.css';
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoctorLogin = () => {
  const [state, setState] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submitDoctorForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://consulto.onrender.com/doctor/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
      } else {
        const doctor = {
          doctorId:data.doctorId,
          doctorToken:data.token
        }
        console.log(doctor)
        toast.success(data.message);
        localStorage.setItem("Doctor", JSON.stringify(doctor));
        navigate('/doctordashboard')

      }

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className='admin'>
      <div className="top-buttons">
        <Button variant="outlined" className="top-btn">
          <Link className='link' to="/adminLogin">Admin</Link>
        </Button>
        <Button variant="outlined" className="top-btn">
          <Link className='link' to="/">Back to User</Link>
        </Button>
      </div>

      <div className="mainContainer">
        <h1>HELLO, DoCTOR</h1>
        <div className="authWrapper">
          <div className="logo">
            <img src="/Consulto_Logo.png" className="Image" alt="Consulto Logo" />
          </div>
          <div className="loginContainer">
            <form id='loginForm' onSubmit={submitDoctorForm}>
              <TextField
                required
                label="Email"
                type="email"
                name="email"
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                required
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                fullWidth
                margin="normal"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* <div id='forgotPassword'><Link to="/forgotpassword">Forgot Password?</Link></div> */}
              <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
                Login Now
              </Button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default DoctorLogin;
