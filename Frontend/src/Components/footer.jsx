const Footer = () => {
    return (
        <footer className="footerContainer">
            <div className="footerTop">
                {/* Logo and About Section */}
                <div className="footerSection aboutSection">
                    <div className="logoContainer">
                        <img src="/Consulto_Logo.png" alt="Consulto Logo" className="footerLogo" />
                        <h2 className="footerTitle">Consulto</h2>
                    </div>
                    <p className="aboutText">
                        Consulto is your trusted healthcare companion, designed to simplify and enhance the patient-doctor interaction.
                        From booking appointments to accessing expert consultations across various specialties, Consulto ensures timely and
                        efficient healthcare delivery.
                    </p>
                </div>

                {/* Company Links */}
                <div className="footerSection linksSection">
                    <h3 className="sectionTitle">Company</h3>
                    <a href="#" className="footerLink">Home</a>
                    <a href="#" className="footerLink">About Us</a>
                    <a href="#" className="footerLink">Book Appointment</a>
                    <a href="#" className="footerLink">Contact Us</a>
                </div>

                {/* Contact Info */}
                <div className="footerSection contactSection">
                    <h3 className="sectionTitle">Get in Touch</h3>
                    <p className="contactText">+91 93815 96405</p>
                    <p className="contactText"><a href="mailto:support@consulto.com">support@consulto.com</a></p>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="footerBottom">
                <div className="iconsContainer">
                    <h3>Follow us on</h3>
                    <span className="footerIcons"><i className="fa-brands fa-instagram"></i></span>
                    <span className="footerIcons"><i className="fa-brands fa-facebook"></i></span>
                    <span className="footerIcons"><i className="fa-brands fa-x-twitter"></i></span>
                    <span className="footerIcons"><i className="fa-brands fa-whatsapp"></i></span>
                </div>
                <p>© 2025 Consulto — All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
