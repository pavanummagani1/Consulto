import express from "express";
import {addDoctor, adminLogin, appointments, categories, deletedoctor, doctors} from "../Controllers/adminController.js";
import upload from "../Middleware/multer.js";
import { email, name, password } from "../Middleware/validations.js";

const adminRouter = express.Router()

adminRouter.post('/adddoctor',upload.single("image"),name,email,addDoctor)
adminRouter.get('/doctors',doctors)
adminRouter.get('/categories',categories)
adminRouter.post('/login',adminLogin)
adminRouter.delete('/deletedoctor', deletedoctor)
adminRouter.get('/appointments', appointments)

export default adminRouter