import express from "express";
import { categories, doctors, singleDoctor } from "../Controllers/adminController.js";
import { Login, Patient, Register } from "../Controllers/clientController.js";
import { email, mobileNumber, name, password } from "../Middleware/validations.js";
import upload from "../Middleware/multer.js";

const clientRouter = express.Router()
clientRouter.get('/categories',categories)
clientRouter.get('/doctors',doctors)
clientRouter.get('/doctors/:id',singleDoctor);
clientRouter.post('/register',upload.single('image'),name,email,mobileNumber,password,Register)
clientRouter.post('/login',password,Login)
clientRouter.post('/patients',Patient)

export default clientRouter