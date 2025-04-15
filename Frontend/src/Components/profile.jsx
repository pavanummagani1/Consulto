import { Link } from "react-router-dom"

const Profile = () => {
    return (
        <>
            <aside className="profileContainer">
                <span className="profileText">MY PROFILE</span>
                <span className="profileText">MY APPOINTMENTS</span>
                <button className="logoutBtn"><Link to='/login'>LOGOUT</Link></button>
            </aside>
        </>
    )

}
export default Profile