import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    guardianName: {
        type: String,
        required: true
    },
    patientAge: {
        type: Number,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    consultingDoctor: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    bookedSlot: {
        type: String,
        required: true
    },
    bookingStatus: {
        type: String,
        default: "Confrimed"
    },
    paymentType: {
        type: String,
        default: 'UPI'
    },
    paymentStatus: {
        type: String,
        default: 'Sucess'
    },
    speciality:{
        type:String
    },
    image:{
        type:String
    },
    appointmentStatus:{
        type:String,
        default:'Upcomming'
    },
    doctorId:{
        type:String,
        required:true
    },
    appointmentid:{
        type:String,
        required:true
    }
}, { minimize: false })

const appointmentModel = mongoose.models.appointments || mongoose.model('appointments', appointmentSchema)

export default appointmentModel;