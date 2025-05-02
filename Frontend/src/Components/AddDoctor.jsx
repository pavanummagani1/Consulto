import { useState } from "react";
import FormsData from "../data/inputsData"
import "../Styles/admin/addDoctorForm.css"
export const AddDoctor = () => {
  const [doctorDetails, setDoctorDetails] = useState({
    doctorProfile: '',
    doctorName: '',
    doctorEmail: '',
    password: '',
    doctorFees: 0,
    doctorSpeciality: '',
    doctorDegree: '',
    doctorAddress: '',
    about: ''
  })
  const addDoctor = async (e) => {
    e.preventDefault()
    console.log(doctorDetails)
    try {
      const formData = new FormData();
      formData.append('doctorProfile', doctorDetails.doctorProfile);
      formData.append('doctorName', doctorDetails.doctorName);
      formData.append('doctorEmail', doctorDetails.doctorEmail);
      formData.append('password', doctorDetails.password);
      formData.append('doctorFees', doctorDetails.doctorFees);
      formData.append('doctorSpeciality', doctorDetails.doctorSpeciality);
      formData.append('doctorDegree', doctorDetails.doctorDegree);
      formData.append('doctorAddress', doctorDetails.doctorAddress);
      formData.append('about', doctorDetails.about);

      let response = await fetch('http://localhost:3535/adddoctor', {
        'method': "POST",
        "body": formData
      });
      if (!response.ok) return new Error('Failed to Add the DOCTOR')
      let data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setDoctorDetails({});
      e.target.reset();
    }

  }
  // HANDLES THE TEXT INPUTS
  const handleInputChange = (e) => {
    setDoctorDetails({ ...doctorDetails, [e.target.name]: e.target.value })
  }
  // HANDELS THE FILE INPUT
  const handleFileChange = (e) => {
    setDoctorDetails({ ...doctorDetails, doctorProfile: e.target.files[0] });
  };
  return (
    <div className="add-doctor-container">
      <form className="add-doctor-form" encType="multipart/form-data" onSubmit={addDoctor}>
        {/* Upload section */}
        <div className="upload-section">
          <div className="upload-icon">&#128100;</div>
          <label htmlFor="uploadImage" className="upload-label">
            Upload doctor <br /> picture
          </label>
          <input type="file" id="uploadImage" name="upload" className="upload-input" onChange={handleFileChange} />
        </div>

        {/* Form fields */}
        <div className="form-fields">
          {FormsData.addDoctorForm.fields.slice(1).map((ele, index) => {
            const label = FormsData.addDoctorForm.labels[index + 1];
            return (
              <div className="form-group" key={index}>
                <label htmlFor={ele.id}>{label}</label>
                <input
                  type={ele.type}
                  placeholder={ele.placeholder}
                  id={ele.id}
                  name={ele.name}
                  onChange={handleInputChange}
                />
              </div>
            );
          })}
        </div>
        <button type="submit" className="submit-button">ADD DOCTOR</button>
      </form>
    </div>
  );
};

export default AddDoctor;
