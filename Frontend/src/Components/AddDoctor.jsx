import { useState } from "react";
import FormsData from "../data/inputsData"
import "../Styles/admin/addDoctorForm.css"
export const AddDoctor = () => {
  const [doctorDetails, setDoctorDetails] = useState({
    doctorProfile:'',
    doctorName:'',
    doctorEmail:'',
    password:'',
    doctorFees:0,
    doctorSpeciality:'',
    doctorDegree:'',
    doctorAddress:'',
    about:''
  })
  const addDoctor = (e)=>{
    e.preventDefault()
    console.log(doctorDetails)
  }
  const handleInputChange = (e)=>{
    setDoctorDetails({...doctorDetails, [e.target.name]:e.target.value})
  }

  return (
    <div className="add-doctor-container">
      <form className="add-doctor-form" onSubmit={addDoctor}>
        {/* Upload section */}
        <div className="upload-section">
          <div className="upload-icon">&#128100;</div>
          <label htmlFor="uploadImage" className="upload-label">
            Upload doctor <br /> picture
          </label>
          <input type="file" id="uploadImage" name="upload" className="upload-input" />
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
