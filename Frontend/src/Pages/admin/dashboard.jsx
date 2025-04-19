import { Button } from "@mui/material"
import AdminHeader from "../../Components/AdminHeader"
import "../../Styles/admin/dashboard.css"
import { useEffect, useState } from "react"
import Table from "../../common/table"


const AdminDashboard = () => {
    const [adminDoctors, setAdminDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [showDoctors, setShowDoctors] = useState(true)
    const [showAppointments, setShowAppointments] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false);

    const displayAppointments = ()=>{
        setShowAppointments(true);
        setShowDoctors(false);
        setShowAddForm(false);
    }
    const displayDoctors = ()=>{
        setShowAppointments(false);
        setShowDoctors(true);
        setShowAddForm(false);
    }
    const displayAddFrom = ()=>{
        setShowAppointments(false);
        setShowDoctors(false);
        setShowAddForm(true);
    }
    const fetchAdminDoctors = async () => {
        try {
            let response = await fetch('http://localhost:3000/doctors');
            if (!response.ok) {
                throw new Error('Failed to fetch')
            }
            let data = await response.json()
            setAdminDoctors(data)
            // console.log("Doctos",data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { fetchAdminDoctors() }, [])
    // 
    const fetchAppointments = async () => {
        try {
            let response = await fetch('http://localhost:3000/patients');
            if (!response.ok) {
                throw new Error('Failed to fetch')
            }
            let data = await response.json()
            setAppointments(data)
            // console.log("Appointments",data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { fetchAppointments() }, [])

    const doctorsColumns = adminDoctors.length > 0 ? Object.keys(adminDoctors[0]) : []
    const appointmentColumns = appointments.length > 0 ? Object.keys(appointments[0]) : []

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
                        <Button variant="outlined" className="dashborardBtns">DOCTORS</Button>
                        <Button variant="outlined" className="dashborardBtns">APPOINTEMTS</Button>
                        <Button variant="outlined" className="dashborardBtns">ADD DOCTORS</Button>
                    </div>
                    <div className="dataContainer">
                        {!showAppointments && !showAddForm && (<div>
                            <span className="text">ALL DOCTORS</span>
                            <Table columns = {doctorsColumns} dataset = {adminDoctors}/>
                        </div>)}
                        {!showDoctors && !showAddForm && (<div>
                            <span className="text">ALL APPOINTMENTS</span>
                            <Table columns = {appointmentColumns} dataset = {appointments}/>
                        </div>)}
                        {/* {showAddForm && (<Table/>)} */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminDashboard