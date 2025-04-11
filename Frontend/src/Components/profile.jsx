const Profile = () => {
    return (
        <>
            <aside className="profileContainer">
                <span className="closeIcon"><i class="fa-solid fa-xmark"></i></span>
                <img src="/profile.png" className="profileImage" />
                <span className="usernameTitle">UserName: <span className="username">Pavan Kalyan</span></span>
                <span className="serEmail">Email:<span className="email">PavanUmmagani1@gmail.com</span></span>
                <button className="logoutBtn">LOGOUT</button>
            </aside>
        </>
    )

}
export default Profile