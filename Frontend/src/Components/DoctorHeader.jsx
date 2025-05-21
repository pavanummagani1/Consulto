import {  useNavigate } from 'react-router-dom'
import '../Styles/admin/header.css'
const DoctorHeader = () => {
  const navigate =  useNavigate()
  
  const doctor = localStorage.getItem('Doctor');
  const handleLogout = ()=>{
    localStorage.removeItem('Doctor');
    navigate('/doctorlogin')
  }
  return (
    <div className="adminHeader">
        <div>
        <img src="/Consulto_Logo.png" alt="header_logo"/>
        <span>doctor</span>
        </div>
        <button className="headerButton" onClick={handleLogout}>{doctor?"LOGOUT":"LOGIN"}</button>
    </div>
  )
}
export default DoctorHeader
