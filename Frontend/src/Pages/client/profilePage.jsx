import React from 'react'
import { Button } from "@mui/material"
import FormsData from '../../data/inputsData'
import Navbar from '../../Components/Header'
export const ProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className="maincontainer">
        <div className="adminSidebar">
          <div className="sidebarContainer">
            <span className="icon"><i className="fa-regular fa-square-plus"></i></span>
            <span className="sidebarDetails">Profile</span>
          </div>
          <div className="sidebarContainer">
            <span className="icon"><i className="fa-solid fa-calendar-check"></i></span>
            <span className="sidebarDetails">Appointments</span>
          </div>
        </div>
        <div className="dataDashboard">
          <div className="BtnContainer">
            <Button variant="outlined" className="dashborardBtns" >My Profile</Button>
            <Button variant="outlined" className="dashborardBtns" >APPOINTEMTS</Button>
          </div>
          <div className="dataContainer">
            {/* <AddDoctor /> */}
            <div className="add-doctor-container">
              <form className="add-doctor-form" encType="multipart/form-data">
                {/* Upload section */}
                <div className="upload-section">
                  <div className="upload-icon">&#128100;</div>
                  <label htmlFor="uploadImage" className="upload-label">
                    Upload <br /> picture
                  </label>
                  <input type="file" id="uploadImage" name="upload" className="upload-input" />
                </div>

                {/* Form fields */}
                <div className="form-fields">
                  {FormsData.profileData.fields.slice(1).map((ele, index) => {
                    const label = FormsData.profileData.label[index + 1];
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

                <button type="submit" className="submit-button">Save Details</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
