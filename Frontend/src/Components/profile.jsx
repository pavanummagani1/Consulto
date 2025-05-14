import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Styles/client/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.userToken;
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleProtectedNavigation = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      alert("You must be logged in to access this page.");
      navigate("/login");
    }
  };

  return (
    <aside className="profileContainer">
      <span className="profileText" onClick={() => handleProtectedNavigation("/profile")}>
        MY PROFILE
      </span>
      <span className="profileText" onClick={() => handleProtectedNavigation("/myappointments")}>
        MY APPOINTMENTS
      </span>
      <button className="logoutBtn" onClick={handleLoginLogout}>
        {isLoggedIn ? "LOGOUT" : "LOGIN"}
      </button>
    </aside>
  );
};

export default Profile;
