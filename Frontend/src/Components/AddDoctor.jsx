import { useState } from "react";
import FormsData from "../data/inputsData";
import "../Styles/admin/addDoctorForm.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const AddDoctor = () => {
  
  const [loading, setLoading] = useState(false); 
  const [doctorDetails, setDoctorDetails] = useState({
    image: '',
    name: '',
    email: '',
    password: '',
    fees: 0,
    speciality: '',
    degree: '',
    address: '',
    about: '',
    department: '',
    avaliableslots: '',
    avaliable: true,
    experience: 0
  });

  const validateForm = () => {
    const requiredFields = ['image', 'name', 'email', 'password', 'fees', 'speciality', 'degree', 'address', 'about', 'department', 'avaliableslots', 'experience'];
    for (let field of requiredFields) {
      if (
        doctorDetails[field] === '' ||
        doctorDetails[field] === null ||
        doctorDetails[field] === undefined ||
        (typeof doctorDetails[field] === 'number' && doctorDetails[field] <= 0)
      ) {
        return false;
      }
    }
    return true;
  };

  const addDoctor = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields!", { position: "top-right" });
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', doctorDetails.image);
      formData.append('name', doctorDetails.name);
      formData.append('email', doctorDetails.email);
      formData.append('password', doctorDetails.password);
      formData.append('fees', doctorDetails.fees);
      formData.append('speciality', doctorDetails.speciality);
      formData.append('degree', doctorDetails.degree);
      formData.append('address', doctorDetails.address);
      formData.append('about', doctorDetails.about);
      formData.append('department', doctorDetails.department);
      formData.append('avaliableslots', [doctorDetails.avaliableslots]);
      formData.append('avaliable', doctorDetails.avaliable);
      formData.append('experience', doctorDetails.experience);

      const response = await fetch('https://consulto.onrender.com/admin/adddoctor', {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "Doctor added successfully!", { position: "top-right" });
        setDoctorDetails({});
        e.target.reset();
      } else {
        toast.error(data.message || "Failed to add doctor!", { position: "top-right" });
      }
      setLoading(false);
    } catch (error) {
      toast.error("Server error. Could not add doctor.", { position: "top-right" });
      console.log(error.message);
    }
  };

  const handleInputChange = (e) => {
    setDoctorDetails({ ...doctorDetails, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setDoctorDetails({ ...doctorDetails, image: e.target.files[0] });
  };

  return (
    <div className="add-doctor-container">
      <form className="add-doctor-form" encType="multipart/form-data" onSubmit={addDoctor}>
        <div className="upload-section">
          <div className="upload-icon">&#128100;</div>
          <label htmlFor="uploadImage" className="upload-label">
            Upload doctor <br /> picture
          </label>
          <input type="file" id="uploadImage" name="image" className="upload-input" onChange={handleFileChange} />
        </div>

        <div className="form-fields">
          {FormsData.addDoctorForm.fields.slice(1).map((ele, index) => {
            const label = FormsData.addDoctorForm.labels[index + 1];
            return (
              <div className="form-group" key={index}>
                <label htmlFor={ele.id}>{label}</label>
                {ele.type === "radio" ? (
                  <div className="radio-group">
                    {ele.options.map((opt, idx) => (
                      <div className="radio-option" key={idx}>
                        <input
                          type="radio"
                          name={ele.name}
                          value={opt.value}
                          checked={doctorDetails[ele.name] === String(opt.value)}
                          onChange={handleInputChange}
                          id={`${ele.name}-${opt.value}`}
                        />
                        <label htmlFor={`${ele.name}-${opt.value}`}>{opt.label}</label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <input
                    type={ele.type}
                    placeholder={ele.placeholder}
                    id={ele.id}
                    name={ele.name}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            );
          })}
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? (
            <div className="loader"></div>
          ) : (
            "ADD DOCTOR"
          )}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddDoctor;
