import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../Styles/client/profilePage.css'

const ProfilePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null); // Start with null
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const userid = userDetails?.userid;
      const navigate = useNavigate()
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://consulto.onrender.com/userdetails/${userid}`);
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setUser(data[0]); // Set the first user object
        } else {
          console.warn('No user data found');
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    if (userid) fetchUserDetails();
  }, [userid]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogout = ()=>{
    localStorage.removeItem('user');
    navigate('/login')
  }




  if (!user) return <p>Loading profile...</p>; // Prevent rendering while user is null

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img className="profile-img" src={user.image} alt="Profile" />
        <h2 className="profile-name">{user.name}</h2>
      </div>

      <div className="profile-sections">
        <div className="card personal-info">
          <h3>Personal Info</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <div className="password-field">
            <strong>Password:</strong>
            <span className="password-mask">
              {showPassword ? user.password : '*********'}
              <button className="eye-btn" onClick={togglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </span>
          </div>
        </div>

        <div className="card contact-info">
          <h3>Contact Info</h3>
          <p><strong>Phone:</strong> {user.mobileNumber}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="card appointments">
          <h3>Appointment Details</h3>
          {Array.isArray(user.appointmentdetails) && user.appointmentdetails.length > 0 ? (
            user.appointmentdetails.map((appt, index) => (
              <div key={index} className="appointment-item">
                <p><strong>Doctor:</strong> {appt.doctorName}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
              </div>
            ))
          ) : (
            <p>No appointments booked.</p>
          )}
        </div>

        <div className="card account-info">
          <h3>Account Created</h3>
          <p><strong>Created on:</strong> {user.date}</p>
        </div>


      </div>

      <button className="reset-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
