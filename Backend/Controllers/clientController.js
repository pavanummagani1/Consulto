import { v2 as cloudinary } from "cloudinary"
import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import appointmentModel from "../Models/appointmentsModel.js";
import reviewsModel from "../Models/reviewsModel.js";
import nodemailer from 'nodemailer'
import { generateJWTToken, generateOtp } from "../utils/utility.js";


export const Register = async (req, res) => {
    try {
        let userData = req.body;
        const mobileNumber = Number(userData.mobileNumber);

        // id
        const userCount = await userModel.countDocuments();
        const nextIdNumber = userCount + 1;
        const userid = `con${String(nextIdNumber).padStart(3, '0')}`
        const date = new Date()



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

        const token = generateJWTToken(user);

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
                password: "N/A", 
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
    const user = await userModel.findOne({ email })
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
            text: `HI,
            ${otp} is your OTP to Reset Password.
            Please Do not share it with anyone.
            Team CONSULTO`,
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
        const user = await userModel.findOne({ email })
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


//Appointments Boooking
export const Appointment = async (req, res) => {
    try {
        const patientData = req.body;
        const { userid, email, patientName, date, bookedSlot, consultingDoctor } = patientData;

        const appointmentCount = await appointmentModel.countDocuments();
        const nextIdNumber = appointmentCount + 1;
        const appointmentid = `appointment${String(nextIdNumber).padStart(3, '0')}`;

        const user = await userModel.findOne({ userid });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        const appointmentDate = new Date(date);
        const today = new Date();
        const isToday =
            appointmentDate.getFullYear() === today.getFullYear() &&
            appointmentDate.getMonth() === today.getMonth() &&
            appointmentDate.getDate() === today.getDate();

        const appointmentStatus = isToday ? "Today" : "Upcoming";

        // Generate Jitsi Meet link with secure room name
        const meetRoomName = `consulto-${appointmentid}-${Date.now()}`;
        const meetUrl = `https://meet.jit.si/${meetRoomName}`;
        
        // Calculate end time (45 minutes after appointment time)
        const [hours, minutes] = bookedSlot.split(':');
        const startDateTime = new Date(appointmentDate);
        startDateTime.setHours(parseInt(hours), parseInt(minutes));
        const endDateTime = new Date(startDateTime.getTime() + 45 * 60000); // 45 minutes

        const completeAppointmentData = {
            ...patientData,
            appointmentid,
            appointmentStatus,
            meetUrl,
            meetRoomName,
            appointmentStartTime: startDateTime,
            appointmentEndTime: endDateTime
        };

        if (!Array.isArray(user.appointdetails)) {
            user.appointdetails = [];
        }

        user.appointdetails.push(completeAppointmentData);
        await user.save();

        const newAppointment = new appointmentModel(completeAppointmentData);
        await newAppointment.save();

        const transporter = nodemailer.createTransport({
            service: "Gmail", 
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS 
            }
        });

        const mailOptions = {
            from: "your_email@gmail.com",
            to: email,
            subject: "Appointment Confirmation - Consulto Telemedicine",
            html: `
                <h2>Appointment Confirmation</h2>
                <p>Hi <strong>${patientName}</strong>,</p>
                <p>Your telemedicine appointment has been confirmed with <strong>${consultingDoctor}</strong>.</p>
                <p><strong>Date:</strong> ${appointmentDate.toDateString()}</p>
                <p><strong>Time:</strong> ${bookedSlot} (duration: 45 minutes)</p>
                <p><strong>Appointment ID:</strong> ${appointmentid}</p>
                <br />
                <h3>Join Your Consultation:</h3>
                <p>At your appointment time, click this link to join your secure video session:</p>
                <a href="${meetUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">
                    Join Video Consultation
                </a>
                <p><small>Note: This link will only be active at your scheduled time.</small></p>
                <br />
                <p>Thank you for choosing Consulto!</p>
                <img src="https://res.cloudinary.com/djzdih0ni/image/upload/v1747478982/Consulto_Logo_da2ib2.png" alt="Consulto Logo" width="200"/>
                <p style="font-size: 12px; color: #666;">
                    <strong>Technical Requirements:</strong> Chrome/Firefox/Safari browser with camera and microphone access.
                </p>
            `
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            status: true,
            message: "Appointment Booked Successfully. Email confirmation with video link sent.",
            appointmentId: appointmentid,
            meetUrl: meetUrl // Optional: return meetUrl in API response if needed
        });

    } catch (error) {
        console.error("Appointment booking error:", error);
        return res.status(500).json({
            status: false,
            message: "Appointment booking failed",
            error: error.message
        });
    }
};






export const userAppointments = async (req, res) => { 
    const now = new Date();
    console.log(now)
    try {
        const { userid } = req.params;
        const appointments = await appointmentModel.find({ userid });
        console.log(appointments[0].bookedSlot)

        const updatedAppointments = await Promise.all(
            appointments.map(async (appointment) => {
                const appointmentDateTime = new Date(`${appointment.date}T${appointment.bookedSlot}`);
                if (appointmentDateTime < now && appointment.status !== 'Completed') {
                    appointment.status = 'Completed';
                    await appointment.save();
                }
                return appointment;
            })
        );

        res.status(200).json(updatedAppointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Failed to fetch appointments" });
    }
};




export const userDetails = async (req, res) => {
    try {
        const { userid } = req.params;
        const user = await userModel.find({ userid }).select('-password');
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


export const updatedetails = async (req, res) => {
    try {
        const userid = req.params.userid;
        const { age, name, gender, email, mobileNumber } = req.body;
        const imageFile = req.file;

        const user = await userModel.findOne({ userid });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
            });
            user.image = imageUpload.secure_url;
        }

        user.age = age || user.age;
        user.name = name || user.name;
        user.gender = gender || user.gender;
        user.email = email || user.email;
        user.mobileNumber = mobileNumber || user.mobileNumber;

        const savedUser = await user.save();

        res.status(200).json({ status: false, message: 'User Not Found, Please Register First', savedUser });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



export const appointmentStatus = async (req, res) => {
    try {
        const { appointmentid } = req.body;
        console.log(appointmentid) 
        if (!appointmentid) {
            return res.status(400).json({ error: "Appointment ID is required" });
        }

        const appointment = await appointmentModel.findOne({ appointmentid });
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        appointment.appointmentStatus = 'Cancelled';
        const updatedAppointment = await appointment.save();

        return res.status(200).json({
            status: true,
            message: 'Appointment Cancelled',
            appointment: updatedAppointment
        });

    } catch (error) {
        console.error("Error cancelling appointment:", error);
        return res.status(500).json({
            status: false,
            error: "Internal server error"
        });
    }
};
