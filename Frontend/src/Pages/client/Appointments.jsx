import { useEffect, useState } from "react";
import "../../Styles/client/appointments.css";
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaVideo } from 'react-icons/fa';

const Appointments = () => {
    const API_BASE_URL = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const userid = user?.userid;

    const fetchAppointments = async () => {
        try {
            const response = await fetch(`https://consulto.onrender.com/appointments/${userid}`);
            const data = await response.json();
            
            // Process appointments to determine their current status
            const processedAppointments = data.map(app => {
                const now = new Date();
                const endTime = new Date(app.appointmentEndTime);
                let status = app.appointmentStatus;
                
                // If appointment end time has passed and it's not already completed or cancelled
                if (now > endTime && status !== "Completed" && status !== "Cancelled") {
                    status = "Completed";
                }
                
                return {
                    ...app,
                    appointmentStatus: status,
                    isActive: isAppointmentActive(app),
                    isUpcoming: isAppointmentUpcoming(app),
                    canJoin: app.paymentStatus === "Success" &&
                        (isAppointmentActive(app) || isAppointmentUpcoming(app))
                };
            });
            
            setAppointments(processedAppointments);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    useEffect(() => {
        if (userid) fetchAppointments();
    }, [userid]);

    const isAppointmentActive = (appointment) => {
        const now = new Date();
        const start = new Date(appointment.appointmentStartTime);
        const end = new Date(appointment.appointmentEndTime);
        return now >= start && now <= end;
    };

    const isAppointmentUpcoming = (appointment) => {
        const now = new Date();
        const start = new Date(appointment.appointmentStartTime);
        return now < start;
    };

    const handleJoinMeeting = (meetUrl) => {
        window.open(meetUrl, '_blank', 'noopener,noreferrer');
    };

    const handleStatus = async (appointment) => {
        const updatedAppointment = {
            ...appointment,
            appointmentStatus: "Cancelled"
        };

        let response = await fetch('https://consulto.onrender.com/updatestatus', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAppointment)
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

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case "upcoming": return "status-badge yellow";
            case "cancelled": return "status-badge red";
            case "completed": return "status-badge green";
            default: return "status-badge";
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
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
                                    {formatDate(appointment.date)} | {appointment.bookedSlot}
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
                            <button 
                                className={`action-btn ${appointment.paymentStatus === "Success" ? "payment-success" : "payment-pending"}`}
                                style={{ backgroundColor: appointment.paymentStatus === "Success" ? "#4CAF50" : "" }}
                            >
                                Payment: {appointment.paymentStatus}
                            </button>

                            {appointment.canJoin && (
                                <button
                                    className="action-btn join-meet"
                                    onClick={() => handleJoinMeeting(appointment.meetUrl)}
                                >
                                    <FaVideo /> Join Meet
                                </button>
                            )}

                            {appointment.appointmentStatus.toLowerCase() !== "cancelled" &&
                                appointment.appointmentStatus.toLowerCase() !== "completed" && (
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
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Appointments;