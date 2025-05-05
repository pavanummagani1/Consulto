import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
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
        type:Number,
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

const patientModel = mongoose.models.patient || mongoose.model('patient', patientSchema)

export default patientModel;