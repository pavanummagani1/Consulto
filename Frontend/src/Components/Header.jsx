import { Component } from "react";
// import List from "./departmentList";
import Profile from "./profile";
import { Link } from "react-router-dom";

class Navbar extends Component {
    state = {
        isSidebarOpened: false,
        isProfileOpened: false
    }
    displayProfile = () => {
        this.setState(prevState => ({
            isProfileOpened: !prevState.isProfileOpened
        }))
    }
    displaySidebar = () => {
        this.setState(prevState => ({
            isSidebarOpened: !prevState.isSidebarOpened
        }))
    }
    render() {
        const {  isProfileOpened } = this.state
        // const departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "Gynecology", "Oncology", "Psychiatry"];
        return (
            <>
                <navbar>
                    <div className="iconContainer">
                        {/* <span className="hamIcon"  onClick={this.displaySidebar} ><i className="fa-solid fa-bars"></i></span> */}
                        <img src="/Consulto_Logo.png" className="navLogo" />
                    </div>
                    <div className="navLinks">
                        <span className="navItems"><Link className="Link" to="/">HOME</Link></span>
                        <span className="navItems"><Link className="Link" to="/aboutus">ABOUT US</Link></span>
                        <span className="navItems"><Link className="Link" to="/alldoctors">ALL DOCTORS</Link></span>
                        <span className="navItems"><Link className="Link" to="/contactus">CONTACT US</Link></span>
                    </div>
                    <div className="profileIcon">
                        <img src="/profile.png" /><ion-icon name="chevron-down-outline" onClick={this.displayProfile}></ion-icon>
                    </div>
                </navbar>
                {isProfileOpened && (<Profile/>)}
                {/* {isSidebarOpened &&(<List departments={departments}/>)} */}
            </>
        )
    }

}
export default Navbar