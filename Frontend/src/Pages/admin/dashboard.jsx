import { Button } from "@mui/material";
import AdminHeader from "../../Components/AdminHeader";
import "../../Styles/admin/dashboard.css";
import { useEffect, useState } from "react";
import Table from "../../common/table";
import { AdminDoctorsCards } from "../../Components/AdminDoctorCards";
import AddDoctor from "../../Components/AddDoctor";

const AdminDashboard = () => {
    const [adminDoctors, setAdminDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [showDoctors, setShowDoctors] = useState(true);
    const [showAppointments, setShowAppointments] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    const appointmentColumns = [
        'patientName',
        'patientAge',
        'mobileNumber',
        'consultingDoctor',
        'email',
        'date',
        'bookedSlot',
        'bookingStatus',
        'paymentType',
        'paymentStatus',
    ];

    const displayAppointments = () => {
        setShowAppointments(true);
        setShowDoctors(false);
        setShowAddForm(false);
    };

    const displayDoctors = () => {
        setShowAppointments(false);
        setShowDoctors(true);
        setShowAddForm(false);
    };

    const displayAddFrom = () => {
        setShowAppointments(false);
        setShowDoctors(false);
        setShowAddForm(true);
    };

    const fetchAdminDoctors = async () => {
        try {
            const response = await fetch('https://consulto.onrender.com/admin/doctors');
            if (!response.ok) throw new Error('Failed to fetch doctors');
            const data = await response.json();
            setAdminDoctors(data);
            console.log("Doctors", data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAppointments = async () => {
        try {
            const response = await fetch('https://consulto.onrender.com/admin/appointments');
            if (!response.ok) throw new Error('Failed to fetch appointments');
            const data = await response.json();

            // Optionally filter dataset to include only selected keys
            const filtered = data.map(item => {
                const allowedKeys = new Set(appointmentColumns);
                return Object.fromEntries(
                    Object.entries(item).filter(([key]) => allowedKeys.has(key))
                );
            });

            setAppointments(filtered);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { fetchAdminDoctors(); }, []);
    useEffect(() => { fetchAppointments(); }, []);

    return (
        <>
            <AdminHeader />
            <div className="maincontainer">
                <div className="adminSidebar">
                    <div className="sidebarContainer" onClick={displayAppointments}>
                        <span className="icon"><i className="fa-solid fa-calendar-check"></i></span>
                        <span className="sidebarDetails">Appointments</span>
                    </div>
                    <div className="sidebarContainer" onClick={displayDoctors}>
                        <span className="icon"><i className="fa-solid fa-user-doctor"></i></span>
                        <span className="sidebarDetails">ALL DOCTORS</span>
                    </div>
                    <div className="sidebarContainer" onClick={displayAddFrom}>
                        <span className="icon"><i className="fa-regular fa-square-plus"></i></span>
                        <span className="sidebarDetails">ADD DOCTORS</span>
                    </div>
                </div>

                <div className="dataDashboard">
                    <div className="BtnContainer">
                        <Button variant="outlined" className="dashborardBtns" onClick={displayDoctors}>DOCTORS</Button>
                        <Button variant="outlined" className="dashborardBtns" onClick={displayAppointments}>APPOINTMENTS</Button>
                        <Button variant="outlined" className="dashborardBtns" onClick={displayAddFrom}>ADD DOCTORS</Button>
                    </div>

                    <div className="dataContainer">
                        {!showAppointments && !showAddForm && (
                            <div>
                                <span className="text">ALL DOCTORS</span>
                                <div className="doctorsContainer">
                                    <AdminDoctorsCards doctors={adminDoctors} />
                                </div>
                            </div>
                        )}

                        {!showDoctors && !showAddForm && (
                            <div>
                                <span className="text">ALL APPOINTMENTS</span>
                                <Table columns={appointmentColumns} dataset={appointments} />
                            </div>
                        )}

                        {showAddForm && <AddDoctor />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
