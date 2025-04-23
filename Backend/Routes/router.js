import express from 'express'
import Register from '../Controllers/registerController.js'
import Login from '../Controllers/loginController.js'
import DoctorLogin from '../Controllers/doctorloginController.js'
import AdminLogin from '../Controllers/adminController.js'
import { userName,userMobileNumber,userPassword,userEmail } from '../Middlewares/middleware.js'
const router =  express.Router()

router.post("/register",userName,userMobileNumber,userPassword,userEmail,Register);
router.post("/login",userEmail,userPassword,Login);
router.post("/doctorlogin",userEmail,userPassword,DoctorLogin);
router.post("/adminlogin",userName,userPassword,AdminLogin);


export default router;