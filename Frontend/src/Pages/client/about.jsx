import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/client/about.css'

class About extends Component {
    render() {
        return (
            <>
                {/* About Container */}
                <section className="bannerSection">
                    <section className="aboutImageContainer">
                        <img src="/about_image.png" alt="" className="aboutImage" />
                    </section>
                    <section className="aboutDetails">
                        <h3 className="aboutTitle">About Us</h3>
                        <p className="aboutPara">Welcome to Consulto, your reliable companion in simplifying healthcare access and management. At Consulto, we recognize the everyday challenges people face in booking doctor appointments and keeping track of their medical records.</p>
                        <p className="aboutPara">Consulto is dedicated to advancing healthcare technology. We consistently work on enhancing our platform by integrating the latest innovations to elevate the user experience and provide top-tier service. Whether you’re scheduling your first consultation or managing ongoing treatment, Consulto is here to guide and support you at every stage.</p>
                        <section className="vision">
                            <p className="aboutPara">At Consulto, our vision is to create a frictionless healthcare journey for every user. We strive to close the gap between patients and healthcare providers, ensuring that accessing medical care is smooth, efficient, and available when you need it the most.</p>
                        </section>
                    </section>
                </section>
                {/* Why Choose us */}
                <section className="chooseUs">
                    <h3 className="aboutTitle">Why Choose US</h3>
                    <section className="cardContainer">
                        {/* .card-1 */}
                        <div className="card" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">PERSONALIZATION:</h5>
                                <p className="card-text">Tailored recommendations and reminders to help you stay on top of your health.</p>
                            </div>
                        </div>
                        {/* card-2 */}
                        <div className="card" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">EFFICIENCY:</h5>
                                <p className="card-text">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                            </div>
                        </div>

                        {/* card-3 */}
                        <div className="card" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">CONVENIENCE:</h5>
                                <p className="card-text">Access to a network of trusted healthcare professionals in your area.</p>
                            </div>
                        </div>
                    </section>
                </section>
            </>
        )
    }
}
export default About