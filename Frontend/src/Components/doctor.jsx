import '../Styles/doctor.css'
const Doctor = (props)=>{
    const {doctors} = props
return(
    <>
    {doctors.filter(doctor=>doctor.yearsOfExperience>=17).map(doctor=>{
        return(
            <div className="doctorCard" key={doctor.id}>
                <img src={doctor.doctorImage}  className="doctorImage"/>
                <span className={`status ${doctor.isAvailable ? "available" : "notAvailable"}`}>
              <span className="dot"></span> {doctor.isAvailable ? "Available" : "Not Available"}
            </span>
                <h3 className="doctorName">{doctor.doctorName}</h3>
                <p className="doctorcategory">Specalization:{doctor.specialization}</p>
                <p className="doctorcategory">{doctor.department}</p>
            </div>
        )
    })}
    </>
)
}
export default Doctor