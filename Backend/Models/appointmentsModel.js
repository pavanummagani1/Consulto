import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientName:{
        type:String,
        required:true
    },
    gaurdianName:{
        type:String,
        required:true
    },
    patientAge:{
        type:Number,
        required:true 
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    consultingDoctor:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:String,
        required:true
    },
    bookedSlot:{
        type:String,
        required:true
    },
    bookingStatus:{
        type:String,
        default:"Confrimed"
    },
    paymentType:{
        type:String,
        default:'UPI'
    },
    paymentStatus:{
        type:String,
        default:'Sucess'
    }
},{minimize:false})

const appointmentModel = mongoose.models.appointments || mongoose.model('appointments', appointmentSchema)

export default appointmentModel;