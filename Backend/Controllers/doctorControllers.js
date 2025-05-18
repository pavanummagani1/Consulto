import appointmentModel from "../Models/appointmentsModel.js";
import doctorModel from "../Models/doctorModel.js";
import bcrypt from 'bcryptjs'
import { generateJWTToken } from "../utils/utility.js";

export const appointments = async (req, res) => {
    try {
        const { id } = req.params;
        const today = new Date().toISOString().split("T")[0];
        console.log(today)
        const result = await appointmentModel.find({
            doctorId: id,
            date: { $gte: today },
            appointmentStatus: "Upcomming"
        });

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in fetching Appointments" });
    }
};


// Doctor Login
export const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await doctorModel.findOne({ email });
        console.log(doctor)
        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        const isValidPassword = await bcrypt.compare(password, doctor.password);
        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        const token = generateJWTToken(doctor);
        return res.status(200).json({success: true,message: 'Login successful',token,doctorId:doctor.doctorid});

    } catch (error) {
        console.error("Doctor login error:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


// Appointments
export const Appointments = async(req,res)=>{
    const {doctorId} = req.params 
    const appointments = await appointmentModel.find({doctorId});
    res.status(200).json(appointments)
}