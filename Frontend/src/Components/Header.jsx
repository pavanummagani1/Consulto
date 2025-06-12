import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaChevronDown } from "react-icons/fa";
import Profile from "../Components/profile";

const Navbar = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const [isProfileOpened, setIsProfileOpened] = useState(false);
  const [loginType, setLoginType] = useState(""); // State for selected login type
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpened((prev) => !prev);
  const toggleProfile = () => setIsProfileOpened((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoginChange = (e) => {
    const selectedValue = e.target.value;
    setLoginType(selectedValue);
    
    if (selectedValue === "admin") {
      localStorage.clear();
      navigate('/adminLogin');
    } else if (selectedValue === "doctor") {
      localStorage.clear();
      navigate('/doctorLogin');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="leftNav">
          <div className="iconContainer">
            <img
              src="/Consulto_Logo.png"
              className="navLogo"
              alt="Consulto Logo"
              onClick={() => window.location.reload()}
            />
          </div>
          <span className="hamIcon" onClick={toggleSidebar}>
            <FaBars />
          </span>
        </div>

        <div className="navLinks">
          <span className="navItems"><Link className="Link" to="/">HOME</Link></span>
          <span className="navItems"><Link className="Link" to="/aboutus">ABOUT US</Link></span>
          <span className="navItems"><Link className="Link" to="/alldoctors">ALL DOCTORS</Link></span>
          <span className="navItems"><Link className="Link" to="/contactus">CONTACT US</Link></span>
          
          {/* Replace the ADMIN span with this select dropdown */}
          <select 
            className="navItems login-select" 
            value={loginType}
            onChange={handleLoginChange}
          >
            <option value="">Select Login</option>
            <option value="admin">Admin Login</option>
            <option value="doctor">Doctor Login</option>
          </select>
        </div>

        {/* Profile with dropdown */}
        <div className="profileWrapper" ref={profileRef}>
          <div className="profileIcon" onClick={toggleProfile}>
            <img src="/profile.png" alt="Profile" />
            <FaChevronDown />
          </div>
          {isProfileOpened && <Profile />}
        </div>
      </nav>

      {isSidebarOpened && (
        <>
          <div className="sidebar open">
            <div className="mobileNavLinks">
              <span className="mobileNavItems"><Link className="Link" to="/">HOME</Link></span>
              <span className="mobileNavItems"><Link className="Link" to="/aboutus">ABOUT US</Link></span>
              <span className="mobileNavItems"><Link className="Link" to="/alldoctors">ALL DOCTORS</Link></span>
              <span className="mobileNavItems"><Link className="Link" to="/contactus">CONTACT US</Link></span>
              {/* Mobile version of the select dropdown */}
              <select 
                className="mobileNavItems login-select" 
                value={loginType}
                onChange={handleLoginChange}
              >
                <option value="">Select Login</option>
                <option value="admin">Admin Login</option>
                <option value="doctor">Doctor Login</option>
              </select>
            </div>
          </div>
          <div className="backdrop" onClick={toggleSidebar}></div>
        </>
      )}
    </>
  );
};

export default Navbar;