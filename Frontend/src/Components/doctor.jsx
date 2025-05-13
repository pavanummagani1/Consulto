import '../Styles/client/doctor.css'
import { useNavigate } from "react-router-dom";
export const TopDoctor = (props)=>{
    const {doctors} = props
    const navigate = useNavigate()
    const showDoctor = (doctorid)=>{
        navigate(`/doctor/${doctorid}`)
    }
return(
    <>
    {doctors.filter(doctor=>doctor.experience>=10).map(doctor=>{
        return(
            <div className="doctorCard" key={doctor.doctorid}>
                <img src={doctor.image}  className="doctorImage"/>
                <span className={`status ${doctor.avaliable? "available" : "notAvailable"}`}>
              <span className="dot"></span> {doctor.avaliable? "Available" : "Not Available"}
            </span>
                <h3 className="doctorName">{doctor.name}</h3>
                <p className="doctorcategory">Specalization:{doctor.speciality}</p>
                <p className="doctorcategory">{doctor.department}</p>
                <button className='detailsBtn' onClick={()=>showDoctor(doctor.doctorid)}>View Details</button>

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
            <div className="doctorCard" key={doctor.doctorid}>
                <img src={doctor.image}  className="doctorImage"/>
                <span className={`status ${doctor.avaliable? "available" : "notAvailable"}`}>
              <span className="dot"></span> {doctor.avaliable? "Available" : "Not Available"}
            </span>
                <h6 className="doctorName">DR.{doctor.name}</h6>
                <p className="doctorcategory">Specalization:{doctor.speciality}</p>
                <p className="doctorcategory">{doctor.department}</p>
                <button className='detailsBtn' onClick={()=>showDoctor(doctor.doctorid)}>View Details</button>
            </div>
        )
    })}
        </>
    )
}