import { TextField, Button } from '@mui/material';
import '../../Styles/client/login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [state, setAdminState] = useState({});
  const [loading, setLoading] = useState(false);
  
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  const submitAdminForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.success) {
        toast.success(data.message || "Login Successful");
        localStorage.setItem("Admin", JSON.stringify({
          adminToken: data.token
        }));
        setTimeout(() => navigate('/admin'), 1500);
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
      e.target.reset();
    }
  };

  const handleChange = (e) => {
    setAdminState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className='admin'>
      <div className="top-buttons">
        <Button variant="outlined" className="top-btn">
          <Link className='link' to="/doctorlogin">Doc Login</Link>
        </Button>
        <Button variant="outlined" className="top-btn">
          <Link className='link' to="/">Back to User</Link>
        </Button>
      </div>
      <div className="mainContainer">
        <h1>WELCOME BACK, ADMIN</h1>
        <div className="authWrapper">
          <div className="logo">
            <img src="/Consulto_Logo.png" className="Image" alt="Consulto Logo" />
          </div>
          <div className="loginContainer">
            <form id='loginForm' onSubmit={submitAdminForm}>
              <TextField 
                required 
                fullWidth
                margin="normal"
                label="Email/Username" 
                type='text' 
                name='adminid' 
                onChange={handleChange} 
              />
              <TextField 
                required
                fullWidth
                margin="normal"
                label="Password" 
                type="password" 
                autoComplete="current-password" 
                name='adminPassword' 
                onChange={handleChange} 
              />
              <Button 
                variant="contained" 
                type='submit'
                disabled={loading}
                fullWidth
                sx={{ mt: 2 }}
              >
                {loading ? 'Logging in...' : 'Login Now'}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default AdminLogin;