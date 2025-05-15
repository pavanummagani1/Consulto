import { useEffect, useState } from "react";
import '../../Styles/client/landing.css';
import { TopDoctor } from '../../Components/doctor';
import { Link, useNavigate } from "react-router-dom";
import '../../Styles/client/header.css';
import '../../Styles/client/footer.css';
import Reviews from "./reviews";
import "../../Styles/client/reviews.css";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://consulto.onrender.com/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch Categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.log(err);
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
        setDoctors(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://consulto.onrender.com/reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch Reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>
      <div className="bannerContainer">
        <div className="bannerDetails">
          <p className="mainText">Book Appointment  <br />With 100+ Trusted <br /> Doctors</p>
          <div className="">
            <img src="/group_profiles.png" className="groupImage" />
            <span>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</span>
          </div>
        </div>
        <img src="/header_img.png" className="bannerImage" />
      </div>

      {/* Categories */}
      <div className="departmentsContainer">
        <div className="departmentsContainerDetails">
          <h3 className="departmentsContainerTitle">Explore Our Medical Services</h3>
          <span className="departmentsContainerAbout">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</span>
          <div className="categoryContainer">
            {categories.map(category => (
              <div
                className="category"
                key={category.id}
                onClick={() => navigate(`/alldoctors?category=${encodeURIComponent(category.category)}`)}
              >
                <img src={category.categoryImage} alt={category.category} />
                <span className="categoryName">{category.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Doctors */}
      <div className="departmentsContainer">
        <div className="departmentsContainerDetails">
          <h3 className="departmentsContainerTitle">TOP DOCTORS TO BOOK</h3>
          <span className="departmentsContainerAbout">Simply browse through our extensive list of trusted doctors.</span>
          <div className="doctorsContainer">
            <TopDoctor doctors={doctors} />
          </div>
          <button className="moreBtn">
            <Link className="btnLink" to='/alldoctors'>More Doctors</Link>
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="reviewContainer">
        <div className="reviewTitle">WHAT PEOPLE SAY</div>
        <Reviews review={reviews} />
      </div>
    </>
  );
};

export default Dashboard;
