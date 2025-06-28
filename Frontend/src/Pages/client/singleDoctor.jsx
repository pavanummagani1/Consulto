import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../../Styles/client/singleDoctor.css';
import FormsData from '../../data/inputsData.js';
import { fetchDoctorById } from "../../Services/services.js";

// Stripe configuration
const stripePromise = loadStripe('pk_test_51RQ5vFDswYzrBk2CF3ebfkNIb1xqhXDQGiU93JbIo9qPBIN6QfGGP6QRdyCKuYVsRYFSJDtVQRQ0QpJKM5oWdBF000O8RdShCR');

// Payment Form Component
const CheckoutForm = ({ 
  handleSubmit, 
  appointment, 
  setAppointmentState,
  selectedDate, 
  selectedSlot,
  doctor,
  closeForm
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast.error("Payment system not ready. Please try again.");
      return;
    }

    setIsProcessing(true);
    try {
      await handleSubmit(e, stripe, elements);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modalcontent">
        <span className="closebutton" onClick={closeForm}>&times;</span>
        <form className="patientsubmitForm formGrid" onSubmit={handleFormSubmit}>
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
                  required
                  onChange={(e) => setAppointmentState(prev => ({ 
                    ...prev, 
                    [e.target.name]: e.target.value 
                  }))}
                />
              </div>
            );
          })}
          
          <div className="payment-section">
            <h4>Payment Details</h4>
            <div className="card-element">
              <CardElement 
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }} 
              />
            </div>
            <div className="payment-summary">
              <p>Doctor: Dr. {doctor.name}</p>
              <p>Date: {selectedDate}</p>
              <p>Time: {selectedSlot}</p>
              <p className="payment-amount">Amount: ₹{Math.max(doctor.fee || 500000, 5000)/100}</p>
            </div>
          </div>

          <button 
            type="submit" 
            className="appointmentBtn" 
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing Payment...' : `Pay ₹${Math.max(doctor.fee || 500000, 5000)/100}`}
          </button>
        </form>
      </div>
    </div>
  );
};

const SingleDoctor = () => {
    const [doctor, setDoctor] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [dateArray, setDateArray] = useState([]);
    const [selectedDateIndex, setSelectedDateIndex] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);
    const [appointmentsData, setAppointmentsData] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [appointment, setAppointmentState] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    let user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch(`https://consulto.onrender.com/doctor/doctor/${id}`);
                const data = await res.json();
                const alteredData = data.map(appointment => {
                    appointment.date = appointment.date.split('T')[0];
                    return appointment;
                });
                setAppointmentsData(alteredData);
            } catch (err) {
                console.error("Error fetching appointments:", err);
            }
        };
        fetchAppointments();
    }, [id]);

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
        setDateArray(arr);
    }, []);

    const showSlots = (index, date) => {
        setSelectedDateIndex(index);
        const [day, month, year] = date.split("/");
        const modifiedDate = `${year}-${month}-${day}`;
        setSelectedDate(modifiedDate);

        const filteredSlots = appointmentsData
            .filter(appoint => appoint.date === modifiedDate)
            .map(appoint => appoint.bookedSlot.toLowerCase());

        setBookedSlots(filteredSlots);

        const totalAvailable = doctor.avaliableslots?.length || 0;
        const totalBooked = doctor.avaliableslots?.filter(slot =>
            filteredSlots.includes(slot.toLowerCase())
        ).length;

        if (totalAvailable === totalBooked) {
            toast.info("All slots booked or no slot available for this date", { position: "top-right" });
            document.getElementById('timeSlots').style.display = 'none';
        } else {
            document.getElementById('timeSlots').removeAttribute('style');
        }
    };

    const bookSlot = (index) => {
        setSelectedTimeIndex(index);
        setSelectedSlot(doctor.avaliableslots[index]);
    };

    const getMonthName = (monthNum) => {
        const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        return months[parseInt(monthNum) - 1];
    };

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const doctor = await fetchDoctorById(id);
                if (doctor) {
                    setDoctor(doctor);
                } else {
                    toast.error('Doctor not found');
                }
            } catch (err) {
                console.error(err);
            }
        };
        if (id) fetchDoctor();
    }, [id]);

const openForm = () => {
    let jwtToken = localStorage.getItem('user');

    if (!selectedDate || selectedTimeIndex === null) {
        toast.error("Please select a date and slot before booking", { position: "top-right" });
        return;
    }

    const today = new Date();
    const selected = new Date(selectedDate);

    const isToday =
        today.getDate() === selected.getDate() &&
        today.getMonth() === selected.getMonth() &&
        today.getFullYear() === selected.getFullYear();

    if (isToday) {
        const currentTime = today.getHours() * 60 + today.getMinutes();

        // Parse 12-hour format time string (e.g., "02:30 PM")
        const selectedTimeStr = doctor.avaliableslots[selectedTimeIndex];
        const [timePart, meridiem] = selectedTimeStr.trim().split(" ");
        let [hours, minutes] = timePart.split(":").map(Number);

        // Convert to 24-hour format
        if (meridiem.toUpperCase() === "PM" && hours !== 12) {
            hours += 12;
        } else if (meridiem.toUpperCase() === "AM" && hours === 12) {
            hours = 0;
        }

        const selectedTimeInMins = hours * 60 + minutes;

        if (selectedTimeInMins <= currentTime) {
            toast.warning("This time slot has already passed for today.", {
                position: "top-right",
            });
            return;
        }
    }

    if (!jwtToken) {
        toast.error("Please Login to Book an Appointment", { position: "top-right" });
        setTimeout(() => navigate('/login'), 5000);
        return;
    }

    const hasUpcomingAppointment = appointmentsData.some(app =>
        app.userid === user.userid &&
        app.doctorId === doctor.doctorid &&
        app.appointmentStatus?.toLowerCase() === "upcomming"
    );

    if (hasUpcomingAppointment) {
        toast.warning("You already have an upcoming appointment with this doctor.", {
            position: "top-right"
        });
        return;
    }

    setShowModal(true);
};


    const buttonStyle = (time, index) => {
        if (index === selectedTimeIndex && !bookedSlots.includes(time.toLowerCase())) {
            return 'active';
        } else if (bookedSlots.includes(time.toLowerCase())) {
            return 'disabled';
        }
        return '';
    };

    const closeForm = () => setShowModal(false);

    const submitForm = async (e, stripe, elements) => {
        e.preventDefault();

        if (!selectedDate || !selectedSlot) {
            toast.error("Please select date and slot", { position: "top-right" });
            return;
        }

        const minimumFee = 50000; // ₹50 minimum
        const finalAppointment = {
            ...appointment,
            consultingDoctor: "Dr. " + doctor.name,
            speciality: doctor.speciality,
            image: doctor.image,
            doctorId: doctor.doctorid,
            date: selectedDate,
            bookedSlot: selectedSlot,
            userid: user.userid,
            amount: Math.max(doctor.fee || minimumFee, minimumFee)
        };

        try { 
            // 1. Create payment intent
            const paymentIntentResponse = await fetch('https://consulto.onrender.com/api/payments/create-payment-intent', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.userToken}`
                },
                body: JSON.stringify({
                    amount: finalAppointment.amount,
                    metadata: finalAppointment
                })
            });

            if (!paymentIntentResponse.ok) {
                const errorData = await paymentIntentResponse.json();
                throw new Error(errorData.error || errorData.message || 'Payment failed');
            }

            const { clientSecret } = await paymentIntentResponse.json();

            // 2. Confirm payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: finalAppointment.patientName || 'Patient',
                        email: finalAppointment.email || 'patient@example.com',
                    },
                },
            });

            if (error) throw error;

            // 3. Save appointment
            if (paymentIntent.status === 'succeeded') {
                const response = await fetch('https://consulto.onrender.com/appointments', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.userToken}`
                    },
                    body: JSON.stringify(finalAppointment)
                });

                if (!response.ok) throw new Error('Failed to save appointment');

                toast.success("Appointment Booked Successfully", { position: "top-right" });
                setTimeout(() => {
                    setShowModal(false);
                    navigate('/myappointments');
                }, 2500);
            }
        } catch (error) {
            console.error("Payment error:", error);
            throw error;
        }
    };

    return (
        <>
            <section className="doctorContainer">
                <section className="doctorImageContainer">
                    <img src={doctor.image} alt='doctor' className="doctorImage" />
                </section>
                <section className="details-bookingContainer">
                    <section className="detailsContainer">
                        <h2 className="docName">DR.{doctor.name}</h2>
                        <p className="department">Department: {doctor.department}</p>
                        <p className="specialization">Specialization: {doctor.speciality}</p>
                        <p className="experience">Experience: {doctor.experience} Years</p>
                        <div className="aboutDoctor">
                            <span className="about">About Doctor</span>
                            <span className="details">{doctor.about}</span>
                        </div>
                    </section>
                    
                    <section className="bookingContainer">
                        <span className="slots">Select Date</span>
                        <div className="date-scroll">
                            {dateArray.map((d, index) => (
                                <div
                                    key={index}
                                    className={`date-item ${index === selectedDateIndex ? 'selected' : ''}`}
                                    onClick={() => showSlots(index, d.formattedDate)}
                                >
                                    <div className="date-top">{d.short}</div>
                                    <div className="date-bottom">{d.day}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bookingContainer" id="timeSlots" style={{ display: "none" }}>
                        <span className="slots">Select Time</span>
                        <div className="time-grid">
                            {doctor.avaliableslots?.map((time, index) => (
                                <button
                                    type="button"
                                    key={index}
                                    className={`time-slot ${buttonStyle(time, index)}`}
                                    onClick={() => bookSlot(index)}
                                    disabled={bookedSlots.includes(time.toLowerCase())}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </section>
                    <button className="booknowBtn" onClick={openForm}>BOOK APPOINTMENT</button>
                </section>
            </section>

            {showModal && (
                <Elements stripe={stripePromise}>
                    <CheckoutForm 
                        handleSubmit={submitForm}
                        appointment={appointment}
                        setAppointmentState={setAppointmentState}
                        selectedDate={selectedDate}
                        selectedSlot={selectedSlot}
                        doctor={doctor}
                        closeForm={closeForm}
                    />
                </Elements>
            )}
            <ToastContainer />
        </>
    );
};

export default SingleDoctor;
