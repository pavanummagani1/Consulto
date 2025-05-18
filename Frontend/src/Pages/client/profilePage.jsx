import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/client/profilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const userDetails = JSON.parse(localStorage.getItem('user'));
  const userid = userDetails?.userid;

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`https://consulto.onrender.com/userdetails/${userid}`);
      const data = await response.json();
      console.log(data)
      if (Array.isArray(data) && data.length > 0) {
        setUser(data[0]);
      } else {
        toast.warn('No user data found');
      }
    } catch (err) {
      toast.error("Error fetching user details");
    }
  };

  useEffect(() => {
    if (userid) fetchUserDetails();
  }, [userid]);

  const handleUpdateClick = () => {
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveChanges = async () => {
    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      const response = await fetch(`https://consulto.onrender.com/userdetails/${userid}`, {
        method: 'PATCH',
        body: formDataToSend,
      });

      if (response.ok) {
        await response.json();
        await fetchUserDetails();
        setIsModalOpen(false);
        toast.success("Profile updated successfully!");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to update profile.");
      }
    } catch (error) {
      toast.error("An error occurred while updating your profile.");
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <ToastContainer />
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

      <button className="reset-btn" onClick={handleUpdateClick}>Update Details</button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Profile</h2>

            <label>
              Profile Image:
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </label>

            <div className="input-row">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age || ''}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="input-row">
              <label>
                Gender:
                <input
                  type="text"
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber || ''}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="input-row">
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="modal-actions">
              <button onClick={handleSaveChanges} className="save-btn">Save Changes</button>
              <button onClick={handleModalClose} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
