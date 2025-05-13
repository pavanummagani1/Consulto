import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/client/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("userToken");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <aside className="profileContainer">
      <span className="profileText">
        <Link to="/profile">MY PROFILE</Link>
      </span>
      <span className="profileText"><Link to='/myappointments'>MY APPOINTMENTS</Link></span>
      <button className="logoutBtn" onClick={handleLoginLogout}>
        {isLoggedIn ? "LOGOUT" : "LOGIN"}
      </button>
    </aside>
  );
};

export default Profile;
