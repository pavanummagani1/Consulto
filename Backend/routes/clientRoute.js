import express from "express";
import { categories, doctors, singleDoctor } from "../Controllers/doctorController.js";
import { Register } from "../Controllers/userController.js";
import { email, mobileNumber, name, password } from "../Middleware/validations.js";
import upload from "../Middleware/multer.js";

const clientRouter = express.Router()
clientRouter.get('/categories',categories)
clientRouter.get('/doctors',doctors)
clientRouter.get('/doctors/:id',singleDoctor);
clientRouter.post('/register',upload.single('image'),name,email,mobileNumber,password,Register)

export default clientRouter