import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminid:{
        type:String,
        required:true
    },
    adminPassword:{
        type:String,
        required:true
    }
})

const adminModel = mongoose.models.admins || mongoose.model('admins', adminSchema)

export default adminModel;