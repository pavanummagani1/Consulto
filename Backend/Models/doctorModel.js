import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    doctorid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    avaliable:{
        type:Boolean,
        required:true
    },
    fees:{
        type:Number,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    avaliableslots:{
        type:Array,
        default:{}
    },
    department:{
        type:String,
        required:true
    }
},{minimize:false})

const doctorModel = mongoose.models.doctors || mongoose.model('doctors', doctorSchema)

export default doctorModel;