import { Link } from 'react-router-dom'
import '../Styles/admin/header.css'
const DoctorHeader = () => {
  
  const doctor = localStorage.getItem('doctor');

  return (
    <div className="adminHeader">
        <div>
        <img src="/Consulto_Logo.png" alt="header_logo"/>
        <span>doctor</span>
        </div>
        <button className="headerButton"><Link className='btnlink' to='/doctorlogin'>{doctor?"LOGOUT":"LOGIN"}</Link></button>
    </div>
  )
}
export default DoctorHeader
