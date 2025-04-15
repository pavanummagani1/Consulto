const express = require('express')
const bcrypt =  require('bcrypt')
const fs = require('fs').promises
const cors = require('cors');
require('dotenv').config()
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT
const app = express();
app.use(cors())
app.use(express.json()) //Parses the incomming Request Object

// USERNAME MIDDLEWARE
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

let userAge = async(req,res,next)=>{
    let age =  req.body.age
    if(age>0 && age<100){
        next()
    }else{
        res.status(400).json('Age must be greater than 0 or lessthan 100')
    }
}

// Register Route
// 
app.post('/register',userName,userEmail,userMobileNumber,userPassword,userAge, async(req,res)=>{
    console.log(req.body)
    let userData  = req.body;
    let existingUsers = JSON.parse(await fs.readFile("./users.json","utf-8"));
    let isExistingUser = existingUsers.find(user=>
        userData.email == user.email ||
        // userData.userName == user.userName ||
        userData.mobileNumber == user.mobileNumber
    )
    if(!isExistingUser){
        existingUsers.push(userData)
        let updatedData = existingUsers
        await fs.writeFile('./users.json',JSON.stringify(updatedData));
        res.status(200).send({message:"Data Updated",updatedData: updatedData})
    }else{
        res.status(400).send({message:'Email  or Mobile Number Already Exists'})
    }

    res.send(req.body)
})

let loginUserData = (req,res,next)=>{
    let username = req.body.userName
    let userNameRegex = /^[a-zA-Z0-9_]{3,15}$/
    let result =  userNameRegex.test(username)
    if(result){
     next()
    }else{
     res.status(400).json('InCorrect UserName')
    }
}
let loginPassword = (req,res,next)=>{
    let password = req.body.password
    let passswordRegex = /^[a-zA-z0-9@!#$&*]{8,12}$/
    let result = passswordRegex.test(password)
    if(result){
        next()
       }else{
        res.status(400).json('InCorrect Password')
       }
}

app.post('/login',loginUserData,loginPassword, async (req,res)=>{
    let userData = req.body
    console.log(userData.password)
    let existingUsers = JSON.parse(await fs.readFile("./users.json","utf-8"));
    let isExistingUser = existingUsers.find(user=>userData.userName == user.userName && bcrypt.compare(userData.password,user.password))
    if(isExistingUser){

        res.status(200).send({message:"Login Successful"})
    }else{
        res.status(400).send({message:'Enter correct Details'})
    }

})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})