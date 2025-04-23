export const AdminDoctorsCards =(props)=>{
    const {doctors} = props
    return(
        <>
        {doctors.map(doctor=>{
        return(
            <div className="doctorCard" key={doctor.id}>
                <img src={doctor.doctorImage}  className="doctorImage"/>
                <span className={`status ${doctor.isAvailable ? "available" : "notAvailable"}`}>
              <span className="dot"></span> {doctor.isAvailable ? "Available" : "Not Available"}
            </span>
                <h5 className="doctorName">{doctor.doctorName}</h5>
                <p className="doctorcategory">Specalization:{doctor.specialization}</p>
                <p className="doctorcategory">{doctor.department}</p>
                <button className='detailsBtn update'>Update Details</button>
                <button className='detailsBtn remove'>Remove Doctor</button>
            </div>
        )
    })}
        </>
    )
}