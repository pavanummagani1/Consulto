import { Link, useNavigate } from 'react-router-dom'
import '../Styles/admin/header.css'
const AdminHeader = () => {
  const navigate = useNavigate()
  const admin = localStorage.getItem('Admin');
  const handleLogout = ()=>{
    localStorage.removeItem('Admin');
    navigate('/adminlogin')
  }
  return (
    <div className="adminHeader">
        <div>
        <img src="/Consulto_Logo.png" alt="header_logo"/>
        <span>admin</span>
        </div>
        <button className="headerButton" onClick={handleLogout}>{admin?"LOGOUT":"LOGIN"}</button>
    </div>
  )
}
export default AdminHeader