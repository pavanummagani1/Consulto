import React, { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import DoctorHeader from '../../Components/DoctorHeader';
import { FaCalendarCheck, FaUserDoctor, FaSquarePlus } from 'react-icons/fa6';
import { fetchDoctorById } from '../../Services/services';
import DoctorProfile from '../../Components/doctorProfile';
import Table from "../../common/table"; // Make sure this is the correct path

const DoctorDashboard = () => {
    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [view, setView] = useState('today'); // Default view is 'today'

    const doctorId = JSON.parse(localStorage.getItem('Doctor'))?.doctorId;

    const fetchAppointments = async () => {
        try {
            const response = await fetch(`https://consulto.onrender.com/doctor/appointments/${doctorId}`);
            const data = await response.json();
            console.log(data)
            setAppointments(data);
        } catch (err) {
            console.error(err);
        }
    };

    const displayProfile = async () => {
        try {
            const doctorData = await fetchDoctorById(doctorId);
            if (doctorData) {
                setDoctor(doctorData);
                setView('profile');
            } else {
                alert('Doctor not found');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const displayAppointments = () => {
        setView('all');
    };

    const displayTodayAppointments = () => {
        setView('today');
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const appointmentColumns = [
        'patientName',
        'patientAge',
        'date',
        'bookedSlot',
        'appointmentStatus',
        'meetUrl',
        'meetRoomName'

    ];

    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointments.filter(app => app.date === today);
    const filteredAppointments = view === 'today' ? todayAppointments : appointments;

    return (
        <>
            <DoctorHeader />

            {/* Mobile Top Buttons */}
            <div className="BtnContainer">
                <Button variant="outlined" className="dashborardBtns" onClick={displayAppointments}>ALL APPOINTMENTS</Button>
                <Button variant="outlined" className="dashborardBtns" onClick={displayTodayAppointments}>TODAY APPOINTMENTS</Button>
                <Button variant="outlined" className="dashborardBtns" onClick={displayProfile}>PROFILE</Button>
            </div>

            <div className="doctorDashboard">
                {/* Sidebar */}
                <div className="doctorSidebar">
                    <div className="sidebarItem" onClick={displayAppointments}>
                        <span className="icon"><FaCalendarCheck /></span>
                        <span className="label">ALL APPOINTMENTS</span>
                    </div>
                    <div className="sidebarItem" onClick={displayTodayAppointments}>
                        <span className="icon"><FaUserDoctor /></span>
                        <span className="label">TODAY APPOINTMENTS</span>
                    </div>
                    <div className="sidebarItem" onClick={displayProfile}>
                        <span className="icon"><FaSquarePlus /></span>
                        <span className="label">PROFILE</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="doctorMainContent">
                    {view === 'profile' && doctor && <DoctorProfile doctor={doctor} />}
                    {(view === 'all' || view === 'today') && (
                        <>
                            <h3>{view === 'today' ? "Today's Appointments" : "All Appointments"}</h3>
                            <Table columns={appointmentColumns} dataset={filteredAppointments} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default DoctorDashboard;
