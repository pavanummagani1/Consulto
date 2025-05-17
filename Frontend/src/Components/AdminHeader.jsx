import { Link } from 'react-router-dom'
import '../Styles/admin/header.css'
const AdminHeader = () => {
  
  const admin = localStorage.getItem('Admin');

  return (
    <div className="adminHeader">
        <div>
        <img src="/Consulto_Logo.png" alt="header_logo"/>
        <span>admin</span>
        </div>
        <button className="headerButton"><Link className='btnlink' to='/adminLogin'>{admin?"LOGOUT":"LOGIN"}</Link></button>
    </div>
  )
}
export default AdminHeader