import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminDoctorsCards = (props) => {
  const { doctors } = props;

  const removeDoctor = async (doctor) => {
    try {
      const response = await fetch('https://consulto.onrender.com/admin/deletedoctor', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(doctor)
      });

      if (response.ok) {
        toast.success(`${doctor.name} deleted successfully!`);
        setTimeout(() => {
            window.location.reload();
          }, 2000);
      } else {
        toast.error(`Failed to delete ${doctor.name}`);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting!");
      console.error(error);
    }
  };

  return (
    <>
      {doctors.map(doctor => (
        <div className="doctorCard" key={doctor.doctorid}>
          <img src={doctor.image} className="doctorImage" />
          <span className={`status ${doctor.avaliable ? "available" : "notAvailable"}`}>
            <span className="dot"></span> {doctor.avaliable ? "Available" : "Not Available"}
          </span>
          <h5 className="doctorName">{doctor.name}</h5>
          <p className="doctorcategory">Specialization: {doctor.speciality}</p>
          <p className="doctorcategory">Department: {doctor.department}</p>
          <button className='detailsBtn update'>Update Details</button>
          <button className='detailsBtn remove' onClick={() => removeDoctor(doctor)}>
            Remove Doctor
          </button>
        </div>
      ))}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};
