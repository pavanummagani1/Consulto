import React, { useState } from 'react';
import '../Styles/doctor/doctorProfile.css';

const DoctorProfile = ({ doctor }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(doctor || {});

    if (!doctor) return <p>Loading doctor profile...</p>;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated Doctor Data:', formData);
        setIsEditing(false);
    };

    const {
        name,
        image,
        email,
        address,
        experience,
        department,
        degree,
        speciality,
        fees,
        availableslots,
    } = isEditing ? formData : doctor;

    return (
        <div className="doctor-profile-container">
            <div className="doctor-profile-header">
                <img src={image} alt={name} className="doctor-profile-image" />
                <h2>{name}</h2>
                <p>{speciality}</p>
            </div>

            {isEditing ? (
                <form className="doctor-edit-form" onSubmit={handleSubmit}>
                    <div className="profile-card">
                        <div className="input-row">
                            <label>
                                Degree:
                                <input name="degree" value={degree} onChange={handleChange} />
                            </label>
                            <label>
                                Department:
                                <input name="department" value={department} onChange={handleChange} />
                            </label>
                        </div>

                        <div className="input-row">
                            <label>
                                Experience:
                                <input type="number" name="experience" value={experience} onChange={handleChange} />
                            </label>
                            <label>
                                Fees:
                                <input type="number" name="fees" value={fees} onChange={handleChange} />
                            </label>
                        </div>

                        <div className="input-row">
                            <label>
                                Speciality:
                                <input name="speciality" value={speciality} onChange={handleChange} />
                            </label>
                            <label>
                                Email:
                                <input name="email" value={email} onChange={handleChange} />
                            </label>
                        </div>

                        <div className="input-row">
                            <label>
                                Address:
                                <input name="address" value={address} onChange={handleChange} />
                            </label>
                            <label>
                                Image URL:
                                <input name="image" value={image} onChange={handleChange} />
                            </label>
                        </div>

                    </div>
                    <div className='frombtns'>
                        <button type="submit" className="update-button">Save Changes</button>
                        <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="doctor-profile-content">
                        <div className="profile-card">
                            <h3>Professional Info</h3>
                            <p><strong>Degree:</strong> {degree}</p>
                            <p><strong>Department:</strong> {department}</p>
                            <p><strong>Experience:</strong> {experience} years</p>
                            <p><strong>Fees:</strong> ₹{fees}</p>
                        </div>

                        <div className="profile-card">
                            <h3>Contact Info</h3>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Address:</strong> {address}</p>
                        </div>

                        <div className="profile-card">
                            <h3>Available Slots</h3>
                            {availableslots?.length > 0 ? (
                                <ul>
                                    {availableslots.map((slot, idx) => <li key={idx}>{slot}</li>)}
                                </ul>
                            ) : <p>No slots available</p>}
                        </div>
                    </div>

                    <button className="update-button" onClick={() => setIsEditing(true)}>
                        Update Details
                    </button>
                </>
            )}
        </div>
    );
};

export default DoctorProfile;
