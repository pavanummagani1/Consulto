export const AdminDoctorsCards =(props)=>{
    const {doctors} = props
    return(
        <>
        {doctors.map(doctor=>{
        return(
            <div className="doctorCard" key={doctor.doctorid}>
                <img src={doctor.image}  className="doctorImage"/>
                <span className={`status ${doctor.avaliable ? "available" : "notAvailable"}`}>
              <span className="dot"></span> {doctor.avaliable ? "Available" : "Not Available"}
            </span>
                <h5 className="doctorName">{doctor.name}</h5>
                <p className="doctorcategory">Specalization:{doctor.speciality}</p>
                <p className="doctorcategory">Department:{doctor.department}</p>
                <button className='detailsBtn update'>Update Details</button>
                <button className='detailsBtn remove'>Remove Doctor</button>
            </div>
        )
    })}
        </>
    )
}