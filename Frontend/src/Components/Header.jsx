import { Component } from "react";
import Profile from "./profile";
import { Link } from "react-router-dom";

class Navbar extends Component {
    state = {
        isSidebarOpened: false,
        isProfileOpened: false
    }

    toggleProfile = () => {
        this.setState(prevState => ({
            isProfileOpened: !prevState.isProfileOpened
        }));
    }

    toggleSidebar = () => {
        this.setState(prevState => ({
            isSidebarOpened: !prevState.isSidebarOpened
        }));
    }

    render() {
        const { isSidebarOpened, isProfileOpened } = this.state;

        return (
            <>
                <navbar>
                    <div className="iconContainer">
                        <img src="/Consulto_Logo.png" className="navLogo" alt="Consulto Logo" />
                    </div>

                    <div className="navLinks">
                        <span className="navItems"><Link className="Link" to="/">HOME</Link></span>
                        <span className="navItems"><Link className="Link" to="/aboutus">ABOUT US</Link></span>
                        <span className="navItems"><Link className="Link" to="/alldoctors">ALL DOCTORS</Link></span>
                        <span className="navItems"><Link className="Link" to="/contactus">CONTACT US</Link></span>
                        <span className="navItems"><Link className="Link" to="/admin">ADMIN</Link></span>
                    </div>

                    <div className="profileIcon">
                        <img src="/profile.png" alt="Profile" />
                        <ion-icon name="chevron-down-outline" onClick={this.toggleProfile}></ion-icon>
                    </div>

                    <span className="hamIcon" onClick={this.toggleSidebar}>
                        <i className="fa-solid fa-bars"></i>
                    </span>
                </navbar>

                {/* Sidebar */}
                <div className={isSidebarOpened ? "sidebar open" : "sidebar"}>
                    <div className="mobileNavLinks">
                        <span className="mobileNavItems"><Link className="Link" to="/">HOME</Link></span>
                        <span className="mobileNavItems"><Link className="Link" to="/aboutus">ABOUT US</Link></span>
                        <span className="mobileNavItems"><Link className="Link" to="/alldoctors">ALL DOCTORS</Link></span>
                        <span className="mobileNavItems"><Link className="Link" to="/contactus">CONTACT US</Link></span>
                        <span className="mobileNavItems"><Link className="Link" to="/appointments">MY APPOINTMENTS</Link></span>
                        <span className="mobileNavItems"><Link className="Link" to="/profile">PROFILE</Link></span>
                        <span className="mobileNavItems"><Link className="Link" to="/login">LOGIN</Link></span>
                    </div>
                </div>

                {/* Backdrop */}
                {isSidebarOpened && <div className="backdrop" onClick={this.toggleSidebar}></div>}

                {/* Profile Dropdown */}
                {isProfileOpened && <Profile />}
            </>
        );
    }
}

export default Navbar;
