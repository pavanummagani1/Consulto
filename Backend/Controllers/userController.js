import { v2 as cloudinary } from "cloudinary"
import userModel from "../Models/userModel.js";

export const Register = async (req, res) => {
    try {
        let userData = req.body;
    
        // id
        const userCount = await userModel.countDocuments();
        const nextIdNumber = userCount + 1;
        const userid = `con${String(nextIdNumber).padStart(3, '0')}`
    
        //uploadImage to Cloudinary
        // const imageUpload = await cloudinary.uploader.upload(userprofie.path, { resource_type: "image" })
        // const image = imageUpload.secure_url
    
        const user = { ...userData, userid, date: Date.now()}
        const newDoctor = new userModel(user)
        await newDoctor.save()
        res.status(201).json({success:true, message:'User Registered Sucessfully'})
    } catch (error) {
        res.status(400).json({success:false, message:'Failed to register',error})
    }
}