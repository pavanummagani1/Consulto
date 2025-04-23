import bcrypt from 'bcrypt'

export const userName = (req,res,next)=>{
    let username = req.body.userName;
    let userNameRegex = /^[a-zA-Z0-9_]{3,15}$/
    let result =  userNameRegex.test(username)
    if(result){
        next()
    }else{
        res.status(400).json('Please Enter UserName in Correct Format')
    }
}

export const userMobileNumber = (req,res,next)=>{
    let mobileNumber = req.body.mobileNumber
    let mobileNumberRegex =  /^[0-9]{10}$/
    let result =  mobileNumberRegex.test(mobileNumber)
    if(result){
        next()
    }else{
        res.status(400).json('Please Enter 10 digit Mobile Number')
    }
}

export const userEmail = (req,res,next)=>{
    let email = req.body.email;
    let emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.(com|yahoo|in|outlook)$/
    let result =  emailRegex.test(email)
    if(result){
        next()
    }else{
        res.status(400).json('Please Enter Email in correct format')
    }
}


export const userPassword = async(req,res,next)=>{
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