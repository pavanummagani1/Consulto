import fs from 'fs';
import path from 'path';
import bcrypt from "bcrypt";
const usersFilePath = path.join(path.resolve(), 'Models/doctor.json');

const DoctorLogin = (req,res)=>{
    let doctorData = req.body
    let existingUsers = JSON.parse(fs.readFileSync(usersFilePath,"utf8"));
    let isExistingUser = existingUsers.find(doctor=>doctorData.doctorName == doctor.doctorName && bcrypt.compare(doctorData.password,doctor.password))
    if(isExistingUser){
        res.status(200).send({message:"Login Successful"})
    }else{
        res.status(400).send({message:'Enter correct Details'})
    }
}
export default DoctorLogin
