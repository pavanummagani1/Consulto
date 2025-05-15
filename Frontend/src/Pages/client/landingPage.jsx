import { useEffect, useState } from "react"
import '../../Styles/client/landing.css'
import { TopDoctor } from '../../Components/doctor'
import { Link, useNavigate } from "react-router-dom";
import '../../Styles/client/header.css'
import '../../Styles/client/footer.css'
import Reviews from "./reviews";
import "../../Styles/client/reviews.css"
const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [doctors, setDoctors] = useState([])
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://consulto.onrender.com/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch Categories');
        }
        const data = await response.json();
        // console.log(data)
        setCategories(data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://consulto.onrender.com/doctors');
        if (!response.ok) {
          throw new Error('Failed to fetch Doctors');
        }
        const data = await response.json();
        console.log(data)
        setDoctors(data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchDoctors();
  }, []);
  //   console.log(doctors)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://consulto.onrender.com/reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch Reviews');
        }
        const data = await response.json();
        // console.log(data)
        setReviews(data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchReviews();
  }, []);

  const navigateLogin = () => {
    navigate('/login')
  }
  return (
    <>
      <div className="bannerContainer">
        <div className="bannerDetails">
          <p className="mainText">Book Appointment  <br />With 100+ Trusted <br /> Doctors</p>
          <div className="">
            <img src="/group_profiles.png" className="groupImage" />
            <span>Simply browse through our extensive list of trusted doctors,schedule your appointment hassle-free.</span>
          </div>
          <button className="createAccountBtn" onClick={navigateLogin}>CREATE ACCOUNT<i className="fa-solid fa-arrow-right"></i></button>
        </div>
        <img src="/header_img.png" className="bannerImage" />
      </div>
      {/*  */}
      <div className="departmentsContainer">
        <div className="departmentsContainerDetails">
          <h3 className="departmentsContainerTitle">Find by Speciality</h3>
          <span className="departmentsContainerAbout">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</span>
          <div className="categoryContainer">
            {categories.map(category => (
              <div
                className="category"
                key={category.catid}
                onClick={() => navigate(`/alldoctors?category=${encodeURIComponent(category.category)}`)}
              >
                <img src={category.categoryImage} alt={category.category} />
                <span className="categoryName">{category.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/*  */}
      <div className="departmentsContainer">
        <div className="departmentsContainerDetails">
          <h3 className="departmentsContainerTitle">TOP DOCTORS TO BOOK</h3>
          <span className="departmentsContainerAbout">Simply browse through our extensive list of trusted doctors.</span>
          <div className="doctorsContainer">
            <TopDoctor doctors={doctors} />
          </div>
          <button className="moreBtn"><Link className="btnLink" to='/alldoctors'>More Doctors</Link></button>
        </div>
      </div>

      {/*  */}
      <div className="appointmentContainer">
        <div className="appointmentDetails">
          <p className="mainText">Book Appointment</p>
          <p className="subText">With 100+ Trusted Doctors</p>
          <button className="createAccountBtn" onClick={navigateLogin}>CREATE ACCOUNT</button>
        </div>
        <img src="appointment_img.png" className="appointmentImage" />
      </div>
      {/* reviews */}
      <div className="reviewContainer">
        <div className="reviewTitle">What Our Patients Say About Us</div>
        <Reviews review={reviews} />
      </div>
    </>
  )
}
export default LandingPage