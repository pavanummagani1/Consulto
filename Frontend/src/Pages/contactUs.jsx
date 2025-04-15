import { Component } from "react"
import '../Styles/contactUs.css'

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
                            <span>00000 Willms Station</span>
                            <span>Suite 000, Washington, USA</span>
                        </div>
                        <div className="contactBlock">
                            <span><b>Tel:</b> 9381596405</span>
                            <span><b>Email:</b> support@consulto.com</span>
                        </div>
                        <div className="contactBlock">
                            <span className="contactHeading">CAREERS AT CONSULTO</span>
                            <button className="viewJobsBtn">VIEW JOBS</button>
                        </div>
                    </section>
                </section>
            </>
        )
    }
}
export default ContactUs