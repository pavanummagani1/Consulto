import React, { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import { Table } from 'antd';
import DoctorHeader from '../../Components/DoctorHeader';
import { FaCalendarCheck, FaUserDoctor, FaSquarePlus, FaVideo } from 'react-icons/fa6';
import { fetchDoctorById } from '../../Services/services';
import DoctorProfile from '../../Components/doctorProfile';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const DoctorDashboard = () => {
    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [view, setView] = useState('today');

    const doctorId = JSON.parse(localStorage.getItem('Doctor'))?.doctorId;

    const fetchAppointments = async () => {
        try {
            const response = await fetch(`${BASE_URL}/doctor/appointments/${doctorId}`);
            const data = await response.json();
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

    const handleJoinMeeting = (meetUrl) => {
        window.open(meetUrl, '_blank', 'noopener,noreferrer');
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const columns = [
        {
            title: 'Patient Name',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
            title: 'Age',
            dataIndex: 'patientAge',
            key: 'patientAge',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Time Slot',
            dataIndex: 'bookedSlot',
            key: 'bookedSlot',
        },
        {
            title: 'Status',
            dataIndex: 'appointmentStatus',
            key: 'appointmentStatus',
            render: (status) => (
                <span className={`status-badge ${
                    status === 'Completed' ? 'completed' : 
                    status === 'Cancelled' ? 'cancelled' : 
                    'upcoming'
                }`}>
                    {status}
                </span>
            )
        },
        {
            title: 'Meeting',
            key: 'meetUrl',
            render: (_, record) => (
                record.meetUrl ? (
                    <Button 
                        type="primary" 
                        icon={<FaVideo />}
                        onClick={() => handleJoinMeeting(record.meetUrl)}
                    >
                        Join Meeting
                    </Button>
                ) : (
                    <span>No link</span>
                )
            ),
        },
        {
            title: 'Room Name',
            dataIndex: 'meetRoomName',
            key: 'meetRoomName',
        }
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
                            <Table 
                                columns={columns} 
                                dataSource={filteredAppointments} 
                                rowKey="appointmentId"
                                pagination={{ pageSize: 10 }}
                            />
                        </>
                    )}
                </div>
            </div>

            <style jsx>{`
                .status-badge {
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 12px;
                    font-weight: 500;
                }
                .status-badge.completed {
                    background-color: #d4edda;
                    color: #155724;
                }
                .status-badge.cancelled {
                    background-color: #f8d7da;
                    color: #721c24;
                }
                .status-badge.upcoming {
                    background-color: #fff3cd;
                    color: #856404;
                }
            `}</style>
        </>
    );
};

export default DoctorDashboard;
