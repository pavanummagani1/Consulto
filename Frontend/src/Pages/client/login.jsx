import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../Styles/client/login.css';

const Login = () => {
  return (
    <div className="mainContainer">
        <h1>WELCOME BACK</h1>
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
          <Button variant="contained">
            <Link to='/register'>New User? Register Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
