import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../Models/doctorModel.js";
import categoryModel from "../Models/categoryModel.js";
import bcrypt from "bcrypt";
import adminModel from "../Models/adminModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from 'nodemailer'
import appointmentModel from "../Models/appointmentsModel.js";
dotenv.config()


export const adminLogin = async (req, res) => {
    try {
        const { adminid, adminPassword } = req.body;

        const admin = await adminModel.findOne({ adminid })
        if (!admin) {
            return res.status(404).json({ sucess: false, message: 'Admin Not Found' })
        }
        console.log("it is working up to this line ", adminPassword, admin.adminPassword)
        const isValidPassword = adminPassword === admin.adminPassword
        console.log(isValidPassword)
        if (!isValidPassword) {
            return res.status(401).json({ sucess: false, message: 'Enter Correct Password' })
        }

        let token = jwt.sign({ adminid }, process.env.LOGIN_SECRET_KEY)
        res.status(200).json({ sucess: true, message: 'Login Sucessful', token })


    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Failed to Login' })
    }
}

export const addDoctor = async (req, res) => {
    try {
        const data = req.body;
        const plainPassword = data.password;
        const email = data.email;
        const imagefile = req.file;

        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const doctorCount = await doctorModel.countDocuments();
        const nextIdNumber = doctorCount + 1;
        const doctorid = `doc${String(nextIdNumber).padStart(3, '0')}`;

        const imageUpload = await cloudinary.uploader.upload(imagefile.path, { resource_type: "image" });
        const image = imageUpload.secure_url;

        const doctorData = {
            ...data,
            password: hashedPassword,
            image,
            date: Date.now(),
            address: data.address,
            avaliableslots: JSON.parse(data.avaliableslots),
            doctorid,
        };

        // 5. Save to DB
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        // 6. Send email with original password
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: "support@consulto.com",
            to: email,
            subject: "Welcome to Consulto - Your Account Credentials",
            html: `
            <p>Hi Dr. ${data.name},</p>
            <p>Welcome to Consulto!</p>
            <p>Your account has been created successfully. Below are your login credentials:</p>
            <p><strong>Email:</strong> ${email}<br>
            <strong>Password:</strong> ${plainPassword}</p>
            <p>Please change your password after your first login for security purposes.</p>
            <br>
            <p>Best regards,<br>Team Consulto</p>
            <br>
            <img src="https://res.cloudinary.com/djzdih0ni/image/upload/v1747478982/Consulto_Logo_da2ib2.png" alt="Consulto Logo" width="200"/>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: 'Doctor added and credentials sent via email' });

    } catch (error) {
        console.error("Error adding doctor:", error);
        res.status(400).json({ success: false, message: 'Failed to add doctor' });
    }
};


export const doctors = async (req, res) => {
    try {
        const allDoctors = await doctorModel.find()
        res.status(200).json(allDoctors)
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed get the Doctors', error })
    }
}

export const categories = async (req, res) => {
    try {
        const allcategories = await categoryModel.find()
        res.status(200).json(allcategories)
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed get the Categories', error })
    }
}

export const singleDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await doctorModel.find({ ["doctorid"]: id }).select('-password')
        res.status(200).json(doctor)
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed get the Doctor', error })
    }
}

export const deletedoctor = async (req, res) => {
    try {
        const { doctorid } = req.body;

        const result = await doctorModel.deleteOne({ doctorid });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json({ message: "Doctor deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting doctor" });
    }
}

export const appointments = async (req, res) => {
    try {
        const result = await appointmentModel.find();
        res.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in fetching Appointments" });
    }
}