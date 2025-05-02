import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../../Styles/client/singleDoctor.css'
import FormsData from '../../data/data.json'

const SingleDoctor = () => {
    const [doctor, setDoctor] = useState({})
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams() //returns the params in the URL
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
    useEffect(() => {
        if (id) { fetchDoctor() }

    }, [id])


    const openForm = () => {
        setShowModal(true);
    };

    const closeForm = () => {
        setShowModal(false);
    };

    return (
        <>
            <section className="doctorContainer">
                <section className="doctorImageContainer">
                    <img src={doctor.doctorImage} alt='doctorImage' className="doctorImage" />
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
                        {/* <button className="booknowBtn" onClick={openForm}>BOOK APPOINTMENT</button> */}
                    </section>
                    <section className="bookingContainer">
                        <section className="bookingSlots">
                            <span className="slots">Booking Slots</span>
                            <div className="timeslots">
                                {doctor.availableSlots?.map((time, index) => <div key={index}>{time}</div>)}
                            </div>
                        </section>
                    </section>
                    <button className="booknowBtn" onClick={openForm}>BOOK APPOINTMENT</button>
                </section>
            </section>
            {/* FROM */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeForm}>&times;</span>
                        {FormsData?.patientForm?.fields?.map((ele, index) => {
                            const label = FormsData?.patientForm?.label?.[index];
                            return (
                                <div className="form-group" key={index}>
                                    <label htmlFor={ele.id}>{label}</label>
                                    <input
                                        type={ele.type}
                                        placeholder={ele.placeholder}
                                        id={ele.id}
                                        name={ele.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    )
}
export default SingleDoctor