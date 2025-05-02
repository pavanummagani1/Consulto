import express from "express";
import addDoctor from "../Controllers/doctorController.js";
import upload from "../Middleware/multer.js";
import { email, name, password } from "../Middleware/validations.js";

const adminRouter = express.Router()

adminRouter.post('/adddoctor',upload.single("image"),name,email,password,addDoctor)

export default adminRouter