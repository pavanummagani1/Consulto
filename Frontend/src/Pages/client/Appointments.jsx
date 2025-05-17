import { useEffect, useState } from "react";
import "../../Styles/client/appointments.css";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Appointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userid = user?.userid;

    const fetchAppointments = async () => {
        try {
            const response = await fetch(`http://localhost:3201/appointments/${userid}`);
            const data = await response.json();
            console.log(data)
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    useEffect(() => {
        if (userid) fetchAppointments();
    }, [userid]);

const handleStatus = async (appointment) => {
    let response = await fetch('http://localhost:3201/updatestatus', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointment)
    });

    if (response.ok) {
        toast.success("Appointment cancelled successfully");
        fetchAppointments();
    } else {
        toast.error("Failed to cancel the appointment");
    }
};


    const handleBookNew = () => {
        navigate('/alldoctors');
    };

    // Helper function to get badge color
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case "upcoming": return "status-badge yellow";
            case "cancelled": return "status-badge red";
            case "completed": return "status-badge green";
            default: return "status-badge";
        }
    };

    return (
        <div className="appointments-wrapper">
            <h2 className="appointments-heading">My Appointments</h2>

            {appointments.length === 0 ? (
                <div className="no-appointments">
                    <img
                        src='/appointment.jpg'
                        alt="No Appointments"
                        className="no-appointments-img"
                    />
                    <h3>No appointments found</h3>
                    <p>You have no upcoming appointments.</p>
                    <button className="book-btn" onClick={handleBookNew}>
                        Book New Appointment
                    </button>
                </div>
            ) : (
                appointments.map((appointment, index) => (
                    <div key={index} className="appointment-card">
                        <div className="left-section">
                            <img
                                src={appointment.image}
                                alt="Doctor"
                                className="doctor-img"
                            />
                            <div className="appointment-info">
                                <h4 className="doctor-name">
                                    Appointment for: {appointment.patientName}
                                </h4>
                                <h4 className="doctor-name">
                                    {appointment.consultingDoctor}
                                </h4>
                                <p className="specialization">
                                    {appointment.speciality}
                                </p>
                                <p>
                                    <strong>Address:</strong><br />
                                    24 Main Street<br />
                                    10 Clause Road
                                </p>
                                <p>
                                    <strong>Date & Time:</strong>{" "}
                                    {appointment.date} | {appointment.bookedSlot}
                                </p>
                                <p>
                                    <strong>Appointment Status:</strong>{" "}
                                    <span className={getStatusClass(appointment.appointmentStatus)}>
                                        {appointment.appointmentStatus}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="right-section">
                            <button className="action-btn">
                                Payment: {appointment.paymentStatus}
                            </button>

                            {/* Hide cancel button only if already cancelled */}
                            {appointment.appointmentStatus.toLowerCase() !== "cancelled" && (
                                <button
                                    className="action-btn cancel"
                                    onClick={() => handleStatus(appointment)}
                                >
                                    Cancel appointment
                                </button>
                            )}
                        </div>

                    </div>
                ))
            )}
            <ToastContainer position="top-right" autoClose={3000}/>
        </div>
    );
};

export default Appointments;
