import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../Styles/singleDoctor.css'

const SingleDoctor = ()=>{
    const [doctor, setDoctor] = useState({})
   const {id} =  useParams() //returns the params in the URL
   const fetchDoctor = async () => {
    try {
        const response = await fetch(`http://localhost:3000/doctors/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        console.log(data)
        setDoctor(data);
    } catch (err) {
        console.log(err)
    }
};
    useEffect(()=>{
        if(id){fetchDoctor()}
        
    },[id])
    return(
        <section className="doctorContainer">
            <section className="doctorImageContainer">
                <img src={doctor.doctorImage} alt='doctorImage' className="doctorImage"/>
            </section>
            <section className="details-bookingContainer">
                <section className="detailsContainer">
                    <h2 className="doctorName">{doctor.doctorName}</h2>
                    <p className="department">Department:{doctor.department}</p>
                    <p className="specialization">Specialization:{doctor.specialization}</p>
                    <p className="experience">Experience: {doctor.yearsOfExperience}Years</p>
                    <div className="aboutDoctor">
                        <span className="about">About Doctor</span>
                        <span className="details">{doctor.aboutDoctor}</span>
                    </div>
                    <button className="booknowBtn">BOOK APPOINTMENT</button>
                </section>
                {/* <section className="bookingContainer">
                    <section className="bookingSlots">
                        <span className="slots">Booking Slots</span>
                    </section>
                </section> */}
            </section>
        </section>
    )
}
export default SingleDoctor