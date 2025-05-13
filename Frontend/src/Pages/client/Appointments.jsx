import React, { useEffect, useState } from "react";
import "../../Styles/client/appointments.css";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userid = user?.userid;

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`http://localhost:3201/appointments/${userid}`);
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };
        if (userid) fetchAppointments();
    }, [userid]);

    return (
        <div className="appointments-wrapper">
            <h2 className="appointments-heading">My Appointments</h2>
            {appointments.map((appointment, index) => (
                <div key={index} className="appointment-card">
                    <div className="left-section">
                        <img
                            src={appointment.image} // Replace with actual doctor image if available
                            alt="Doctor"
                            className="doctor-img"
                        />
                        <div className="appointment-info">
                            <h4 className="doctor-name">Appointment for:{appointment.patientName}</h4>
                            <h4 className="doctor-name">{appointment.consultingDoctor}</h4>
                            <p className="specialization">{appointment.speciality}</p>
                            <p><strong>Address:</strong><br />24 Main Street<br />10 Clause Road</p>
                            <p><strong>Date & Time:</strong> {appointment.date} | {appointment.bookedSlot}</p>
                        </div>
                    </div>
                    <div className="right-section">
                        <button className="action-btn">Payment: {appointment.paymentStatus}</button>
                        <button className="action-btn cancel">Cancel appointment</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Appointments;
