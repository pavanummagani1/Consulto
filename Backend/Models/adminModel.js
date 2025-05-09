import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const adminModel = mongoose.models.admins || mongoose.model('admins', adminSchema)

export default adminModel;