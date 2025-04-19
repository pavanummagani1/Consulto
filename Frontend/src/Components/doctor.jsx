import '../Styles/client/doctor.css'
import { useNavigate } from "react-router-dom";
export const TopDoctor = (props)=>{
    const {doctors} = props
    const navigate = useNavigate()
    const showDoctor = (id)=>{
        navigate(`/doctor/${id}`)
    }
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
                <button className='detailsBtn' onClick={()=>showDoctor(doctor.id)}>View Details</button>

            </div>
        )
    })}
    </>
)
}

export const AllDoctors =(props)=>{
    const {doctors} = props
    const navigate = useNavigate()
    const showDoctor = (id)=>{
        navigate(`/doctor/${id}`)
    }
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
                <button className='detailsBtn' onClick={()=>showDoctor(doctor.id)}>View Details</button>
            </div>
        )
    })}
        </>
    )
}