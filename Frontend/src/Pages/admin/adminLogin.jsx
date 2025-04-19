import { TextField, Button } from '@mui/material';
import '../../Styles/client/login.css';

const AdminLogin = () => {
  return (
    <div className="mainContainer">
        <h1>WELCOME BACK, DOCTOR</h1>
      <div className="authWrapper">
        <div className="logo">
          <img src="/Consulto_Logo.png" className="Image" alt="Consulto Logo" />
        </div>
        <div className="loginContainer">
          <form id='loginForm'>
            <TextField required label="Email/UserName" type='text' name='email' />
            <TextField label="Password" type="password" autoComplete="current-password" name='password' />
            <Button variant="contained" type='submit'>Login Now</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
