import { v2 as cloudinary } from "cloudinary"
import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import twilio from 'twilio';
dotenv.config()
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
export const Register = async (req, res) => {
    try {
        let userData = req.body;

        // id
        const userCount = await userModel.countDocuments();
        const nextIdNumber = userCount + 1;
        const userid = `con${String(nextIdNumber).padStart(3, '0')}`

        //uploadImage to Cloudinary
        // const imageUpload = await cloudinary.uploader.upload(userprofie.path, { resource_type: "image" })
        // const image = imageUpload.secure_url

        const user = { ...userData, userid, date: Date.now() }
        const newDoctor = new userModel(user)
        await newDoctor.save()
        res.status(201).json({ success: true, message: 'User Registered Sucessfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to register', error })
    }
}

export const Login = async (req, res) => {
    let userData = req.body
    let token = jwt.sign(userData, process.env.LOGIN_SECRET_KEY)
    let { email, password } = userData
    let user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ status: false, message: 'User Not Found' })
    let isPasswordMatched = bcrypt.compare(password, user.password);
    if (isPasswordMatched) return res.status(200).json({ status: true, message: "Login Sucessfull", token })
}

export const Patient = async (req, res) => {
    try {
        const patientData = req.body;
        console.log(patientData)

        //save data to db
        //msg 
        const message = await twilioClient.messages.create({
            body: `Hi ${patientData.patientName}.Your appointment with ${patientData.doctorName} at CONSULTO APP is confirmed on ${patientData.appointmentDate} at ${patientData.appointmentTime}.
            Join the Meet Link before 15 Minutes prior to your appointment time.`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:+91${patientData.mobileNumber}`
        });

        console.log('WhatsApp message sent:', message.sid);

        res.status(200).json({ status: true, message: "Appointment Booked Successfully. WhatsApp confirmation sent." });

    } catch (error) {
        console.error('Error in booking appointment:', error);
        res.status(500).json({ status: false, message: "Appointment booking failed", error: error.message });
    }
};