import express from "express";
import {addDoctor, categories, doctors} from "../Controllers/doctorController.js";
import upload from "../Middleware/multer.js";
import { email, name, password } from "../Middleware/validations.js";

const adminRouter = express.Router()

adminRouter.post('/adddoctor',upload.single("image"),name,email,password,addDoctor)
adminRouter.get('/doctors',doctors)
adminRouter.get('/categories',categories)

export default adminRouter