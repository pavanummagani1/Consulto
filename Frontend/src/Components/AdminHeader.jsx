import { Link } from 'react-router-dom'
import '../Styles/admin/header.css'
const AdminHeader = () => {
  return (
    <div className="adminHeader">
        <div>
        <img src="/Consulto_Logo.png" alt="header_logo"/>
        <span>admin</span>
        </div>
        <button className="headerButton"><Link className='btnlink' to='/adminLogin'>Login</Link></button>
    </div>
  )
}
export default AdminHeader