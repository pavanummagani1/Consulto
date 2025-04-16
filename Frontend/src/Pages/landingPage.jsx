import { useEffect, useState } from "react"
import '../Styles/landing.css'
import {TopDoctor} from "../Components/doctor"
import { Link } from "react-router-dom";
const LandingPage = ()=>{
    const [categories, setCategories] = useState([]); 
    const[doctors, setDoctors] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch('http://localhost:3000/categories');
            if (!response.ok) {
              throw new Error('Failed to fetch users');
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
            const response = await fetch('http://localhost:3000/doctors');
            if (!response.ok) {
              throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            // console.log(data)
            setDoctors(data);
          } catch (err) {
            console.log(err)
          }
        };
    
        fetchDoctors();
      }, []);
    //   console.log(doctors)
    return(
        <>
        <div className="bannerContainer">
                    <div className="bannerDetails">
                        <p className="mainText">Book Appointment  <br />With 100+ Trusted <br /> Doctors</p>
                        <div className="">
                            <img src="/group_profiles.png" className="groupImage" />
                            <span>Simply browse through our extensive list of trusted doctors,schedule your appointment hassle-free.</span>
                        </div>
                        <button className="createAccountBtn">CREATE ACCOUNT<i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                    <img src="/header_img.png" className="bannerImage" />
                </div>
                {/*  */}
                <div className="departmentsContainer">
                    <div className="departmentsContainerDetails">
                        <h3 className="departmentsContainerTitle">Find by Speciality</h3>
                        <span className="departmentsContainerAbout">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</span>
                        <div className="categoryContainer">
                            {categories.map(category=><div className="category" key={category.id}><img src={category.categoryImage}/> <span className="categoryName">{category.category}</span></div>)}
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="departmentsContainer">
                    <div className="departmentsContainerDetails">
                        <h3 className="departmentsContainerTitle">TOP DOCTORS TO BOOK</h3>
                        <span className="departmentsContainerAbout">Simply browse through our extensive list of trusted doctors.</span>
                        <div className="doctorsContainer">
                            <TopDoctor doctors = {doctors}/>
                        </div>
                        <button className="moreBtn"><Link className="btnLink" to='/alldoctors'>More Doctors</Link></button>
                    </div>
                </div>

                {/*  */}
                <div className="appointmentContainer">
                    <div className="appointmentDetails">
                        <p className="mainText">Book Appointment</p>
                        <p className="subText">With 100+ Trusted Doctors</p>
                        <button className="createAccountBtn">CREATE ACCOUNT</button>
                    </div>
                    <img src="appointment_img.png" className="appointmentImage" />
                </div>
        </>
    )
}
export default LandingPage