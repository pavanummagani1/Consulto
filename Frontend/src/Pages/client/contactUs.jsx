import { Component } from "react"
import { Link } from "react-router-dom"
import '../../Styles/client/contactUs.css'

class ContactUs extends Component {
    render() {
        return (
            <>
                <section className="contactUsContainer">
                    <section className="contactUsImageContainer">
                        <img src="/contact_image.png" className="contactUsImage" alt="Contact Us" />
                    </section>
                    <section className="contactUsDetails">
                        <h3 className="contactUsTitle">CONTACT US</h3>
                        <div className="contactBlock">
                            <span className="contactHeading">OUR OFFICE</span>
                            <span>TEAM ABODE, 2nd Floor</span>
                            <span>500019 Hyderabad,Telangana, INDIA</span>
                        </div>
                        <div className="contactBlock">
                            <span><b>Tel:</b> 9381596405</span>
                            <span><b>Email:</b> support@consulto.com</span>
                        </div>
                        <div className="contactBlock">
                            <span className="contactHeading">CAREERS AT CONSULTO</span>
                            <button className="viewJobsBtn"> <Link className="link" to='/careers'>VIEW JOBS</Link> </button>
                        </div>
                    </section>
                </section>
            </>
        )
    }
}
export default ContactUs