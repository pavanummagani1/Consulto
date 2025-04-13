import '../Styles/doctor.css'
import SingleDoctor from '../Pages/singleDoctor'
export const TopDoctor = (props)=>{
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

export const AllDoctors =(props)=>{
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
                <h3 className="doctorName">{doctor.doctorName}</h3>
                <p className="doctorcategory">Specalization:{doctor.specialization}</p>
                <p className="doctorcategory">{doctor.department}</p>
                <button className='detailsBtn' onClick={(doctor)=><SingleDoctor doctor={doctor}/>}>View Details</button>
            </div>
        )
    })}
        </>
    )
}