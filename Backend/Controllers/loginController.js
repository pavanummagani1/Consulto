import fs from 'fs';
import path from 'path';
import bcrypt from "bcrypt";
const usersFilePath = path.join(path.resolve(), 'Models/users.json');

const Login = (req,res)=>{
    let userData = req.body
    console.log(userData.password)
    let existingUsers = JSON.parse(fs.readFileSync(usersFilePath,"utf8"));
    let isExistingUser = existingUsers.find(user=>userData.userName == user.userName && bcrypt.compare(userData.password,user.password))
    if(isExistingUser){
        res.status(200).send({message:"Login Successful"})
    }else{
        res.status(400).send({message:'Enter correct Details'})
    }
}
export default Login
