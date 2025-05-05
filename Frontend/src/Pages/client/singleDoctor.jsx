import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import '../../Styles/client/singleDoctor.css'
import FormsData from '../../data/inputsData.js'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SingleDoctor = () => {
    const [doctor, setDoctor] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [patient, setPatientState] = useState({})
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [bookedSlots, setBookedSlots] = useState([]) // Track booked slots
    const navigate = useNavigate()
    const { id } = useParams()

    // Generate dates for next 6 days (excluding Sunday)
    const generateAvailableDates = () => {
        const dates = [];
        const today = new Date();
        
        for (let i = 1; i <= 7; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            
            // Skip Sunday (day 0)
            if (nextDay.getDay() !== 0) {
                dates.push(nextDay.toISOString().split('T')[0]);
            }
            
            // Stop when we have 6 days (excluding Sunday)
            if (dates.length === 6) break;
        }
        
        return dates;
    };

    const availableDates = generateAvailableDates();

    const fetchDoctor = async () => {
        try {
            const response = await fetch(`http://localhost:3201/doctors/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            data.length > 0 ? setDoctor(data[0]) : alert('Failed to get the data')
            
            // Fetch existing appointments for this doctor
            const appointmentsResponse = await fetch(`http://localhost:3201/patients?doctorId=${id}`);
            if (appointmentsResponse.ok) {
                const appointments = await appointmentsResponse.json();
                // Extract booked slots
                const booked = appointments.map(app => app.appointmentTime);
                setBookedSlots(booked);
            }
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        if (id) { fetchDoctor() }
    }, [id])

    // PATIENT FORM
    const submitPatientForm = async (e) => {
        e.preventDefault()
        // Include selected slot and doctor info in patient data
        const appointmentData = {
            ...patient,
            doctorId: id,
            doctorName: doctor.name,
            appointmentTime: selectedSlot,
        };
        
        try {
            const response = await fetch(`http://localhost:3201/patients`, {
                'method': 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(appointmentData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to book appointment');
            }
            
            const data = await response.json();
            console.log(data);
            
            // Add the slot to booked slots
            setBookedSlots(prev => [...prev, selectedSlot]);
            
            toast.success("Appointment booked successfully!", { position: "top-right" });
            setShowModal(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to book appointment", { position: "top-right" });
        }
    };

    const onInputChange = (e) => {
        setPatientState({ ...patient, [e.target.name]: e.target.value });
    };

    const selectSlot = (time) => {
        // Don't allow selection if slot is booked
        if (!bookedSlots.includes(time)) {
            setSelectedSlot(time);
        }
    };

    const openForm = () => {
        if (!selectedSlot) {
            toast.error("Please select a time slot first", { position: "top-right" });
            return;
        }

        // Don't allow booking if slot is already booked
        if (bookedSlots.includes(selectedSlot)) {
            toast.error("This slot is already booked", { position: "top-right" });
            return;
        }

        let jwtToken = localStorage.getItem('userToken');
        if (!jwtToken) {
            toast.error("Please Login to Book an Appointment", { position: "top-right" });
            setTimeout(() => {
                navigate('/login')
            }, 5000)
            return;
        }
        
        // Set doctor name in form data
        setPatientState(prev => ({
            ...prev,
            doctorName: doctor.name,
            appointmentTime: selectedSlot
        }));
        
        setShowModal(true);
    };

    const closeForm = () => {
        setShowModal(false);
    };

    // Function to check if a slot is available
    const isSlotAvailable = (time) => {
        return !bookedSlots.includes(time);
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
                    </section>
                    <section className="bookingContainer">
                        <section className="bookingSlots">
                            <span className="slots">Booking Slots</span>
                            <div className="timeslots">
                                {doctor.avaliableslots?.map((time, index) => (
                                    <div 
                                        key={index} 
                                        onClick={() => selectSlot(time)}
                                        className={`
                                            ${selectedSlot === time ? 'selected-slot' : ''}
                                            ${!isSlotAvailable(time) ? 'booked-slot' : ''}
                                        `}
                                        title={!isSlotAvailable(time) ? "This slot is already booked" : ""}
                                    >
                                        {time}
                                        {!isSlotAvailable(time) && <span className="booked-label">BOOKED</span>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </section>
                    <button className="booknowBtn" onClick={openForm}>
                        BOOK APPOINTMENT
                    </button>
                    {selectedSlot && isSlotAvailable(selectedSlot) && (
                        <p className="selected-slot-info">Selected: {selectedSlot}</p>
                    )}
                </section>
            </section>
            
            {/* FORM MODAL */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modalcontent">
                        <span className="closebutton" onClick={closeForm}>&times;</span>
                        <form className="patientsubmitForm formGrid" onSubmit={submitPatientForm}>
                            {FormsData?.patientForm?.fields?.map((ele, index) => {
                                const label = FormsData?.patientForm?.label?.[index];
                                
                                // Auto-fill doctor name field
                                if (ele.name === 'doctorName') {
                                    return (
                                        <div className="formgroup" key={index}>
                                            <label htmlFor={ele.id}>{label}</label>
                                            <input
                                                type={ele.type}
                                                id={ele.id}
                                                name={ele.name}
                                                value={doctor.name}
                                                readOnly
                                            />
                                        </div>
                                    );
                                }
                                
                                // Custom date input with only available dates
                                if (ele.name === 'appointmentDate') {
                                    return (
                                        <div className="formgroup" key={index}>
                                            <label htmlFor={ele.id}>{label}</label>
                                            <select
                                                id={ele.id}
                                                name={ele.name}
                                                onChange={onInputChange}
                                                required
                                            >
                                                <option value="">Select a date</option>
                                                {availableDates.map((date, i) => (
                                                    <option key={i} value={date}>
                                                        {new Date(date).toLocaleDateString('en-US', {
                                                            weekday: 'short',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    );
                                }
                                
                                // Regular input fields
                                return (
                                    <div className="formgroup" key={index}>
                                        <label htmlFor={ele.id}>{label}</label>
                                        <input
                                            type={ele.type}
                                            placeholder={ele.placeholder}
                                            id={ele.id}
                                            name={ele.name}
                                            onChange={onInputChange}
                                            required={ele.required}
                                        />
                                    </div>
                                );
                            })}
                            <input 
                                type="submit" 
                                value='Book an Appointment' 
                                className="appointmentBtn" 
                            />
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    )
}

export default SingleDoctor