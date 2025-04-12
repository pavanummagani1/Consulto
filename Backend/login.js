const express  =  require('express');
const cors =  require('cors');
const fs =  require('fs').promises;
const bcrypt =  require('bcrypt');
const app = express();
app.use(cors())
app.use(express.json())

const PORT = 3210

let userName = (req,res,next)=>{
    let username = req.body.userName;
    let userNameRegex = /^[a-zA-Z0-9_]{3,15}$/
    let result =  userNameRegex.test(username)
    if(result){
        next()
    }else{
        res.status(400).json('Please Enter UserName in Correct Format')
    }
}

let userMobileNumber = (req,res,next)=>{
    let mobileNumber = req.body.mobileNumber
    let mobileNumberRegex =  /^[0-9]{10}$/
    let result =  mobileNumberRegex.test(mobileNumber)
    if(result){
        next()
    }else{
        res.status(400).json('Please Enter 10 digit Mobile Number')
    }
}

let userEmail = (req,res,next)=>{
    let email = req.body.email;
    let emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.(com|yahoo|in|outlook)$/
    let result =  emailRegex.test(email)
    if(result){
        next()
    }else{
        res.status(400).json('Please Enter Email in correct format')
    }
}


let userPassword = async(req,res,next)=>{
    let password = req.body.password
    let passswordRegex = /^[a-zA-z0-9@!#$&*]{8,12}$/
    let result = passswordRegex.test(password);
    if(result){
        req.body.password =  await bcrypt.hash(password,10)
        next()
    }else{
        res.status(400).json('Please Enter Password in correct format')
    }
}



app.post('/register',userName,userMobileNumber, userEmail,userPassword, async(req,res)=>{
    let userData = req.body
    console.log(userData)
    let existingUsers = JSON.parse(await fs.readFile("./users.json","utf8"));
    let isExistingUser = existingUsers.find(user=>
        userData.email == user.email ||
        userData.userName == user.userName ||
        userData.mobileNumber == user.mobileNumber
    )
    console.log(isExistingUser)
    if(!isExistingUser){
        existingUsers.push(userData)
        let updatedData = existingUsers
        await fs.writeFile('./users.json',JSON.stringify(updatedData));
        res.status(200).send({message:"Data Updated",updatedData: updatedData})
    }else{
        res.status(400).send({message:'Email  or Mobile Number Already Exists'})
    }
})

app.listen(PORT,()=>{
    console.log('The Server has Started Successfully')
})