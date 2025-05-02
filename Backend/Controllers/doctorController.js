import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../Models/doctorModel.js";

const addDoctor = async(req,res)=>{
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

        const doctorData ={...data,image,date:Date.now(),address:JSON.parse(data.address), doctorid}
        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.status(200).json({success:true, message:'Doctor Added Successfully'})
    } catch (error) {
        console.log(error)
    }

}
export default addDoctor