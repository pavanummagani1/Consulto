import fs from 'fs';
import path from 'path';
const usersFilePath = path.join(path.resolve(), 'Models/users.json');

const Register = (req,res)=>{
    let userData = req.body
    let existingUsers = JSON.parse(fs.readFileSync(usersFilePath,"utf8"));
    let isExistingUser = existingUsers.find(user=>
        userData.email == user.email ||
        userData.username == user.username ||
        userData.mobileNumber == user.mobileNumber
    )
    console.log(isExistingUser)
    if(!isExistingUser){
            existingUsers.push(userData)
            fs.writeFileSync(usersFilePath,JSON.stringify(existingUsers));
            res.status(200).json({message:"Data Updated",updatedData: userData})
    }else{
        res.status(400).json({message:'Email  or Mobile Number Already Exists'})
    }
}
export default Register