import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../Styles/client/singleDoctor.css';
import FormsData from '../../data/inputsData.js';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SingleDoctor = () => {
    const [doctor, setDoctor] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [dateArray, setDateArray] = useState([]);
    const [selectedDateIndex, setSelectedDateIndex] = useState(null);
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedSlot, setSelectedSlot] = useState('')
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);
    const [appointmentsData, setAppointmentsData] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([])
    const [appointment, setApponitmentState] = useState()
    const navigate = useNavigate();
    const { id } = useParams();

    let user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        const fetchAppointments = async () => {
          try {
            const res = await fetch(`http://localhost:3201/doctor/doctor/${id}`)
            const data = await res.json()
            // console.log(data)
            setAppointmentsData(data)
          } catch (err) {
            console.error("Error fetching appointments:", err)
          }
        }
        fetchAppointments()
      }, [id])


    useEffect(() => {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const today = new Date();
        const arr = [];

        for (let i = 0; i <= 6; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            const dayIndex = date.getDay();
            const dayName = days[dayIndex];

            if (dayName !== 'SUN') {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = String(date.getFullYear());

                arr.push({
                    day: dayName,
                    formattedDate: `${day}/${month}/${year}`,
                    short: `${day} ${getMonthName(month)}`
                });
            }

        }

        console.log(arr)

        setDateArray(arr);
    }, []);

    
    const showSlots = (index, date) => {
        setSelectedDateIndex(index);
        const timeSlotContainer = document.getElementById('timeSlots');
    
        const [day, month, year] = date.split("/");
        const modifiedDate = `${year}-${month}-${day}`;
        setSelectedDate(modifiedDate);
    
        const filteredSlots = appointmentsData
            .filter(appoint => appoint.date === modifiedDate)
            .map(appoint => appoint.bookedSlot.toLowerCase());
    
        setBookedSlots(filteredSlots);
        setSelectedSlot(doctor.avaliableslots[index]);
    
        // Check if all available slots are booked
        const totalAvailable = doctor.avaliableslots?.length || 0;
        const totalBooked = doctor.avaliableslots?.filter(slot =>
            filteredSlots.includes(slot.toLowerCase())
        ).length;
    
        if (totalAvailable === totalBooked) {
            toast.info("All slots booked or no slot available for this date", { position: "top-right" });
            timeSlotContainer.style.display = 'none';
        } else {
            timeSlotContainer.removeAttribute('style');
        }
    };
    

    const getMonthName = (monthNum) => {
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        return months[parseInt(monthNum) - 1];
    };

    const fetchDoctor = async () => {
        try {
            const response = await fetch(`http://localhost:3201/doctors/${id}`);
            if (!response.ok) throw new Error('Failed to fetch doctor');
            const data = await response.json();
            data.length > 0 ? setDoctor(data[0]) : alert('Doctor not found');
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (id) fetchDoctor();
    }, [id]);

    const openForm = () => {
        let jwtToken = user.userToken;
        if (!jwtToken) {
            toast.error("Please Login to Book an Appointment", { position: "top-right" });
            setTimeout(() => navigate('/login'), 5000);
            return;
        }
    
        if (!selectedDate || selectedTimeIndex === null) {
            toast.error("Please select a date and slot before booking", { position: "top-right" });
            return;
        }
    
        setShowModal(true);
    };

    const buttonStyle = (time, index) => {
        if(index === selectedTimeIndex && bookedSlots.indexOf(time) < 0){
            return 'active'
        }else if(bookedSlots.indexOf(time) >= 0){
            return 'disabled'
        }
    }

    const closeForm = () => setShowModal(false);


    // SUBMITTING THE BOOKING FORM
    const submitForm = async (e) => {
        e.preventDefault();
    
        if (!selectedDate || !selectedSlot) {
            toast.error("Please select date and slot", { position: "top-right" });
            return;
        }
    
        const finalAppointmnet = {
            ...appointment,
            consultingDoctor: "Dr. " + doctor.name,
            speciality:doctor.speciality,
            image:doctor.image,
            doctorId: doctor.doctorid,
            date: selectedDate,
            bookedSlot: selectedSlot,
            userid:user.userid,
        };
    
        try {
            const response = await fetch('http://localhost:3201/appointments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(finalAppointmnet)
            });
    
            if (response.ok) {
                toast.success("Appointment Booked Successfully", { position: "top-right" });
                setTimeout(()=>{
                    setShowModal(false)
                },2500)
            } else {
                const errorData = await response.json();
                toast.error(`Failed to book appointment: ${errorData.message || "Unknown error"}`, { position: "top-right" });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong. Please try again.", { position: "top-right" });
        }
    };
    
    // setting the details for Appointment object
    const handleChange = (e)=>{
        setApponitmentState({ ...appointment, [e.target.name]: e.target.value });
    }
    return (
        <>
            <section className="doctorContainer">
                <section className="doctorImageContainer">
                    <img src={doctor.image} alt='doctor' className="doctorImage" />
                </section>
                <section className="details-bookingContainer">
                    <section className="detailsContainer">
                        <h2 className="doctorName">{doctor.name}</h2>
                        <p className="department">Department: {doctor.department}</p>
                        <p className="specialization">Specialization: {doctor.speciality}</p>
                        <p className="experience">Experience: {doctor.experience} Years</p>
                        <div className="aboutDoctor">
                            <span className="about">About Doctor</span>
                            <span className="details">{doctor.about}</span>
                        </div>
                    </section>
                    {/* Date Selector */}
                    <section className="bookingContainer">
                        <span className="slots">Select Date</span>
                        <div className="date-scroll">
                            {dateArray.map((d, index) => (
                                <div
                                    key={index}
                                    className={`date-item ${index === selectedDateIndex ? 'selected' : ''}`}
                                    onClick={() => showSlots(index,d.formattedDate)}
                                >
                                    <div className="date-top">{d.short}</div>
                                    <div className="date-bottom">{d.day}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Time Slots */}
                    <section className="bookingContainer" id="timeSlots" style={{display:"none"}}>
                        <span className="slots">Select Time</span>
                        <div className="time-grid">
                            {doctor.avaliableslots?.map((time, index) => (
                                <button
                                    type="button"
                                    key={index}
                                    className={`time-slot ${buttonStyle(time, index)}`}
                                    onClick={() => setSelectedTimeIndex(index)}
                                    disabled = {bookedSlots.indexOf(time) >= 0 ? true :false}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </section>
                    <button className="booknowBtn" onClick={openForm}>BOOK APPOINTMENT</button>
                </section>
            </section>

            {/* Modal Form */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modalcontent">
                        <span className="closebutton" onClick={closeForm}>&times;</span>
                        <form className="patientsubmitForm formGrid" onSubmit={submitForm}>
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
                                            onChange={handleChange}
                                        />
                                    </div>
                                );
                            })}
                            <input type="submit" value='Book an Appointment' className="appointmentBtn" />
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
};

export default SingleDoctor;
