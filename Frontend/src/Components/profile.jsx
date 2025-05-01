import { Link } from "react-router-dom"
import "../Styles/client/profile.css"
const Profile = () => {
    return (
        <>
            <aside className="profileContainer">
                <span className="profileText"><Link to='/profile'>MY PROFILE</Link></span>
                <span className="profileText">MY APPOINTMENTS</span>
                <button className="logoutBtn"><Link className="btnLinks" to='/login'>LOGOUT</Link></button>
            </aside>
        </>
    )

}
export default Profile