import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../Models/doctorModel.js";
import categoryModel from "../Models/categoryModel.js";

export const addDoctor = async(req,res)=>{
    try {
        const data = req.body;
        const imagefile = req.file

        // id
        const doctorCount = await doctorModel.countDocuments();
        const nextIdNumber = doctorCount + 1;
        const doctorid = `doc${String(nextIdNumber).padStart(3, '0')}`


        //uploadImage to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imagefile.path,{resource_type:"image"})
        const image = imageUpload.secure_url

        const doctorData ={...data,image,date:Date.now(),address:data.address,avaliableslots: JSON.parse(data.avaliableslots), doctorid}
        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.status(200).json({success:true, message:'Doctor Added Successfully'})
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false, message:'Failed to add doctor'})
    }

}

export const doctors = async(req,res)=>{
    try {
        const allDoctors = await doctorModel.find()
        res.status(200).json(allDoctors)
    } catch (error) {
        res.status(400).json({success:false, message:'Failed get the Doctors',error})
    }
}

export const categories = async (req,res)=>{
try {
    const allcategories = await  categoryModel.find()
    res.status(200).json(allcategories)
} catch (error) {
    res.status(400).json({success:false, message:'Failed get the Categories',error})
}
}

export const singleDoctor = async(req,res)=>{
    try {
        const {id} =  req.params;
        const doctor = await doctorModel.find({["doctorid"]:id}).select('-password')
        res.status(200).json(doctor)
    } catch (error) {
        res.status(400).json({success:false, message:'Failed get the Doctor',error})
    }
}