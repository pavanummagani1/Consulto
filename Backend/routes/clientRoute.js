import express from "express";
import { categories, doctors, singleDoctor } from "../Controllers/adminController.js";
import { Appointment, googleLogin, Login, Register, reviews, userAppointments, userDetails } from "../Controllers/clientController.js";
import { email, mobileNumber, name, password } from "../Middleware/validations.js";
import upload from "../Middleware/multer.js";

const clientRouter = express.Router()
clientRouter.get('/categories',categories)
clientRouter.get('/doctors',doctors)
clientRouter.get('/doctors/:id',singleDoctor);
clientRouter.post('/register',name,email,mobileNumber,password,Register)
clientRouter.post('/login',Login)
clientRouter.post('/appointments',Appointment)
clientRouter.get('/appointments/:userid',userAppointments)
clientRouter.get('/userdetails/:userid', userDetails)
clientRouter.get('/reviews',reviews)
clientRouter.post('/auth/google', googleLogin)
export default clientRouter