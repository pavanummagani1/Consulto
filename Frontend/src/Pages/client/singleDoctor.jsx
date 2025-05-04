import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import '../../Styles/client/singleDoctor.css'
import FormsData from '../../data/inputsData.js'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const SingleDoctor = () => {
    const [doctor, setDoctor] = useState({})
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
    const { id } = useParams() //returns the params in the URL
    const fetchDoctor = async () => {
        try {
            const response = await fetch(`http://localhost:3201/doctors/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            data.length>0? setDoctor(data[0]):alert('Failed to get the data')
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        if (id) { fetchDoctor() }

    }, [id])


    const openForm = () => {
        let jwtToken = localStorage.getItem('userToken');
        if(!jwtToken){
            toast.error("Please Login to Book an Appointment", { position: "top-right" });
            setTimeout(()=>{
                navigate('/login')
            },5000)
            return
        }
        setShowModal(true);
    };

    const closeForm = () => {
        setShowModal(false);
    };

    return (
        <>
            <section className="doctorContainer">
                <section className="doctorImageContainer">
                    <img src={doctor.image} alt='doctorImage' className="doctorImage" />
                </section>
                <section className="details-bookingContainer">
                    <section className="detailsContainer">
                        <h2 className="doctorName">{doctor.name}</h2>
                        <p className="department">Department:{doctor.department}</p>
                        <p className="specialization">Specialization:{doctor.speciality}</p>
                        <p className="experience">Experience: {doctor.experience}Years</p>
                        <div className="aboutDoctor">
                            <span className="about">About Doctor</span>
                            <span className="details">{doctor.about}</span>
                        </div>
                        {/* <button className="booknowBtn" onClick={openForm}>BOOK APPOINTMENT</button> */}
                    </section>
                    <section className="bookingContainer">
                        <section className="bookingSlots">
                            <span className="slots">Booking Slots</span>
                            <div className="timeslots">
                                {doctor.avaliableslots?.map((time, index) => <div key={index}>{time}</div>)}
                            </div>
                        </section>
                    </section>
                    <button className="booknowBtn" onClick={openForm}>BOOK APPOINTMENT</button>
                </section>
            </section>
            {/* FROM */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modalcontent">
                        <span className="closebutton" onClick={closeForm}>&times;</span>
                        <form className="patientsubmitForm formGrid">
                        {FormsData?.patientForm?.fields?.map((ele, index) => {
                            const label = FormsData?.patientForm?.label?.[index];
                            return (
                                <div className="formgroup" key={index}>
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
                        <input type="button" value='Book an Appointment' class="appointmentBtn"/>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    )
}
export default SingleDoctor