import { Component } from "react";
import List from "./departmentList";
import Profile from "./profile";

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
        const { isSidebarOpened, isProfileOpened } = this.state
        const departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology", "Gynecology", "Oncology", "Psychiatry"];
        return (
            <>
                <navbar>
                    <div className="iconContainer">
                        <span className="hamIcon"  onClick={this.displaySidebar} ><i className="fa-solid fa-bars"></i></span>
                        <img src="/Consulto_Logo.png" className="navLogo" />
                    </div>
                    <div className="navLinks">
                        <span className="navItems">HOME</span>
                        <span className="navItems">ABOUT US</span>
                        <span className="navItems">ALL DOCTORS</span>
                        <span className="navItems">CONTACT US</span>
                    </div>
                    <div className="profileIcon" onClick={this.displayProfile}>
                        <img src="/profile.png" />
                    </div>
                </navbar>
                {isSidebarOpened &&(<List departments={departments}/>)}
                {isProfileOpened && (<Profile/>)}
            </>
        )
    }

}
export default Navbar