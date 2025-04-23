import fs from 'fs';
import path from 'path';
import bcrypt from "bcrypt";
const usersFilePath = path.join(path.resolve(), 'Models/admin.json');

const AdminLogin = (req,res)=>{
    let userData = req.body
    console.log(userData)
    let existingUsers = JSON.parse(fs.readFileSync(usersFilePath,"utf8"));
    let isExistingUser = existingUsers.find(admin=>userData.adminId == admin.adminId && bcrypt.compare(userData.password,admin.password))
    // console.log(isExistingUser)
    if(isExistingUser){
        res.status(200).json({message:"Login Successful"})
    }else{
        res.status(400).json({message:'Enter correct Details'})
    }
}
export default AdminLogin
