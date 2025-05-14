// import { v2 as cloudinary } from "cloudinary"
import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
// import twilio from 'twilio';
import appointmentModel from "../Models/appointmentsModel.js";
import reviewsModel from "../Models/reviewsModel.js";
import { OAuth2Client } from 'google-auth-library';
import nodemailer from 'nodemailer'
dotenv.config()

// const twilioClient = twilio(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_AUTH_TOKEN
// );


// JWT TOKEN for google
const generateJWTToken = (user) => {
    return jwt.sign(
        {
            id: user.userid,
            email: user.email,
            role: user.role || 'user',
        },
        process.env.LOGIN_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );
};

// OTP FOR MAIL
const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp
}

export const Register = async (req, res) => {
    try {
        let userData = req.body;
        const mobileNumber = Number(userData.mobileNumber);

        // id
        const userCount = await userModel.countDocuments();
        const nextIdNumber = userCount + 1;
        const userid = `con${String(nextIdNumber).padStart(3, '0')}`
        const date = new Date()
        //uploadImage to Cloudinary
        // const imageUpload = await cloudinary.uploader.upload(userprofie.path, { resource_type: "image" })
        // const image = imageUpload.secure_url

        const user = { ...userData, mobileNumber, userid, date }
        console.log(user)
        const newUser = new userModel(user)
        await newUser.save()
        res.status(201).json({ success: true, message: 'User Registered Sucessfully' })
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to register', error })
    }
}

export const Login = async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData)
        const { email, password } = userData;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, message: 'User Not Found' });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(401).json({ status: false, message: 'Invalid Credentials' });
        }

        const token = jwt.sign(userData, process.env.LOGIN_SECRET_KEY);

        return res.status(200).json({
            status: true,
            message: "Login Successful",
            token,
            userid: user.userid
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
};

// GOOGLE LOGIN
export const googleLogin = async (req, res) => {
    try {
        const { email, name, avatar, uid } = req.body;

        if (!email || !uid || !name) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let user = await userModel.findOne({ email });

        if (!user) {
            // 👉 generate custom userid like 'con001'
            const userCount = await userModel.countDocuments();
            const nextIdNumber = userCount + 1;
            const userid = `con${String(nextIdNumber).padStart(3, '0')}`;

            const date = new Date();

            user = await userModel.create({
                name,
                email,
                image: avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                userid,
                authMethod: 'google',
                firebaseId: uid,
                password: "N/A", // for schema compliance if needed
                date
            });
        }

        const token = generateJWTToken(user);

        return res.json({
            status: true,
            token,
            userid: user.userid,
            message: "Google login successful",
        });
    } catch (err) {
        console.error("Google login error:", err);
        res.status(500).json({ message: "Google login failed", error: err.message });
    }
};


// Forgot password;
export const forgotpassword = async (req, res) => {
    const { email } = req.body
    const user = await userModel.findOne({ email });
    if (user) {
        const otp = generateOtp()

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
            subject: "Your OTP TO RESET PASSWORD",
            text: `Your OTP code is: ${otp}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "OTP sent successfully", otp });
        } catch (err) {
            console.error("Mail error:", err);
            res.status(500).json({ error: "Failed to send OTP" });
        }
    }
    else {
        return res.status(404).json({ status: false, message: 'User Not Found, Please Register First' });
    }


}

// Update Password
export const updatepassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Failed to update password." });
  }
};


export const Appointment = async (req, res) => {
    try {
        const patientData = req.body;
        // const {email,mobileNumber} = patientData
        console.log(patientData)
        // const appointment = await appointmentModel.findOne({
        //     $or: [
        //       { email },
        //       { mobileNumber }
        //     ]
        //   });
        // console.log(appointment)
        // if(!appointment&&true){
        const newAppointment = new appointmentModel(patientData)
        await newAppointment.save()
        res.status(200).json({ status: true, message: "Appointment Booked Successfully. WhatsApp confirmation sent." });
        // }else{
        // res.status(400).json({ status: false, message: "Appointment booking failed"});
        // }

    } catch (error) {
        console.error('Error in booking appointment:', error);
        res.status(500).json({ status: false, message: "Appointment booking failed", error: error.message });
    }
};

export const userAppointments = async (req, res) => {
    try {
        const { userid } = req.params;
        const appointments = await appointmentModel.find({ userid });
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Failed to fetch appointments" });
    }
};

export const userDetails = async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await userModel.find({ userid });
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Failed to fetch userDetails" });
    }
}

export const reviews = async (req, res) => {
    try {
        const reviews = await reviewsModel.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching Reviwes:", error);
        res.status(500).json({ message: "Failed to fetch Reviews" });
    }
}


export const appointmentStatus = async(req, res)=>{
    console.log(req.body)
}