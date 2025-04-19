import { useEffect, useState } from "react"
import { AllDoctors } from "../../Components/doctor"
import List from "../../Components/departmentList"
import '../../Styles/client/allDoctors.css'
import "../../Styles/client/landing.css"

const Doctors = () => {
    const departments = ["General Physcian", "Gynecology", "Dermatology", "Pediatrics", "Neurology", "Gastroentrologist", "Cardilogy", "Orthopedics"];
    const [doctors, setDoctors] = useState([])
    const fetchDoctors = async () => {
        try {
            const response = await fetch('http://localhost:3000/doctors');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            // console.log(data)
            setDoctors(data);
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        fetchDoctors();
    }, []);
    return (
        <>
            <div className="AlldoctorsContainer">
                <input className="inputSearch" type="search" placeholder="Search Docotor or Category"/>
                <div className="doctorList">
                <div className="listContainer">
                    <List departments={departments} />
                </div>
                <div className="doctorsContainer">
                    <AllDoctors doctors={doctors} />
                </div>
                </div>
            </div>
        </>
    )

}
export default Doctors